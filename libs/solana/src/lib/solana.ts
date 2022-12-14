import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
  Transaction as SolanaTransaction,
} from '@solana/web3.js'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { NAME } from '../version'
import { convertCommitment, getPublicKey, parseEndpoint, parseTransactionSimulation, removeDecimals } from './helpers'
import {
  BalanceMint,
  BalanceMintMap,
  BalanceSummary,
  BalanceToken,
  Commitment,
  PublicKeyString,
  SolanaConfig,
  TokenBalance,
} from './interfaces'

export class Solana {
  readonly endpoint: string
  readonly connection: Connection

  constructor(endpoint: string, private readonly config: SolanaConfig = {}) {
    this.endpoint = parseEndpoint(endpoint)
    this.connection = new Connection(this.endpoint)
    config.logger?.log(`${NAME}: Solana RPC Endpoint: ${this.endpoint}`)
  }

  confirmTransaction(
    {
      blockhash,
      lastValidBlockHeight,
      signature,
    }: { blockhash: string; lastValidBlockHeight: number; signature: string },
    commitment: Commitment,
  ) {
    return this.connection.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight,
        signature,
      },
      convertCommitment(commitment),
    )
  }

  async getAccountHistory(account: PublicKeyString) {
    this.config.logger?.log(`Getting account history: ${getPublicKey(account)}`)
    try {
      const history = await this.connection.getConfirmedSignaturesForAddress2(getPublicKey(account))
      return {
        account,
        history,
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
  async getAccountInfo(
    accountId: PublicKeyString,
    commitment = Commitment.Confirmed,
  ): Promise<RpcResponseAndContext<AccountInfo<ParsedAccountData>>> {
    this.config.logger?.log(`Getting account info: ${accountId}`)
    const info = await this.connection.getParsedAccountInfo(new PublicKey(accountId), convertCommitment(commitment))

    return info as RpcResponseAndContext<AccountInfo<ParsedAccountData>>
  }

  async getBalance(
    accountId: PublicKeyString,
    mints: BalanceMint | BalanceMint[],
    commitment: Commitment = Commitment.Finalized,
  ): Promise<BalanceSummary> {
    mints = Array.isArray(mints) ? mints : [mints]
    this.config.logger?.log(
      `Getting account balance summary: ${accountId} for mints ${mints.map((mint) => mint.publicKey).join(', ')}`,
    )

    if (!mints.length) {
      throw new Error(`getBalance: No mints provided.`)
    }
    const defaultMint = mints[0]
    try {
      const tokens: BalanceToken[] = []

      const tokenAccountResult: PromiseSettledResult<{
        mint: BalanceMint
        accounts: string[]
      }>[] = await Promise.allSettled(
        mints.map((mint) => {
          return this.getTokenAccounts(accountId, mint.publicKey).then((accounts) => ({ mint, accounts }))
        }),
      )
      const tokenAccounts = tokenAccountResult
        .filter((item) => item.status === 'fulfilled')
        .map((item) => (item as PromiseFulfilledResult<{ mint: BalanceMint; accounts: string[] }>).value)

      const mintMap: Record<string, string[]> = mints.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.publicKey]: tokenAccounts.find((ta) => ta.mint.publicKey === curr.publicKey)?.accounts || [],
        }
      }, {})

      for (const { mint, accounts } of tokenAccounts) {
        for (const account of accounts) {
          const { balance } = await this.getTokenBalance(account, commitment)
          tokens.push({
            account,
            balance: removeDecimals(balance, mint.decimals).toString(),
            decimals: mint.decimals,
            mint: mint.publicKey,
          })
        }
      }

      const mintBalance: BalanceMintMap = tokens.reduce<BalanceMintMap>((acc, { mint, balance }) => {
        const current = acc[mint] ? acc[mint] : new BigNumber(0)

        return { ...acc, [mint]: current.plus(balance) }
      }, {})

      return {
        balance: (mintBalance[defaultMint.publicKey] ? mintBalance[defaultMint.publicKey] : '0').toString(),
        mintMap,
        mints: mintBalance,
        tokens,
      }
    } catch (e) {
      throw new Error(
        `No token accounts found for ${mints.length > 1 ? `mints ${mints.join(', ')}` : `mint ${defaultMint}`}`,
      )
    }
  }

  async getBalanceSol(accountId: PublicKeyString): Promise<number> {
    this.config.logger?.log(`Getting account balance: ${accountId} (SOL)`)
    return this.connection.getBalance(getPublicKey(accountId))
  }

  getMinimumBalanceForRentExemption(dataLength: number) {
    this.config.logger?.log(`Getting minimum balance for rent exemption: ${dataLength}`)
    return this.connection.getMinimumBalanceForRentExemption(dataLength)
  }

  getLatestBlockhash() {
    this.config.logger?.log(`Getting latest blockhash`)
    return this.connection.getLatestBlockhash()
  }

  async getTokenAccounts(account: PublicKeyString, mint: PublicKeyString) {
    this.config.logger?.log(`Getting token account: ${getPublicKey(account)} / mint: ${getPublicKey(mint)}`)
    const res = await this.connection.getTokenAccountsByOwner(getPublicKey(account), { mint: getPublicKey(mint) })
    return res.value.map(({ pubkey }) => pubkey.toBase58())
  }

  getTokenAccountsHistory(accounts: PublicKeyString[]) {
    this.config.logger?.log(`Getting token accounts history: ${accounts}`)
    return Promise.all(accounts.map((account) => this.getAccountHistory(account)))
  }

  async getTokenBalance(
    account: PublicKeyString,
    commitment: Commitment = Commitment.Finalized,
  ): Promise<TokenBalance> {
    this.config.logger?.log(`Getting token balance: ${getPublicKey(account)} with commitment: ${commitment}`)
    const res = await this.connection.getTokenAccountBalance(getPublicKey(account), convertCommitment(commitment))
    return {
      account,
      balance: new BigNumber(res.value.amount),
    }
  }

  async getTokenHistory(account: PublicKeyString, mint: PublicKeyString) {
    this.config.logger?.log(`Getting token history: ${getPublicKey(account)} / ${getPublicKey(mint)} `)
    return this.getTokenAccounts(account, mint).then((accounts) => this.getTokenAccountsHistory(accounts))
  }

  async getTransaction(signature: string) {
    this.config.logger?.log(`Getting transaction: ${signature} `)
    const status = await this.connection.getSignatureStatus(signature, { searchTransactionHistory: true })
    const transaction = await this.connection.getTransaction(signature, { maxSupportedTransactionVersion: 0 })
    return { signature, status, transaction }
  }

  requestAirdrop(account: PublicKeyString, amount: number) {
    this.config.logger?.log(`Request Airdrop: ${getPublicKey(account)} ${amount}`)
    return this.connection.requestAirdrop(getPublicKey(account), amount)
  }

  async sendRawTransaction(tx: SolanaTransaction) {
    await this.simulateTransaction(tx)
    this.config.logger?.log(`Send Raw Transaction`)
    return this.connection.sendRawTransaction(tx.serialize(), { skipPreflight: false })
  }

  async simulateTransaction(tx: SolanaTransaction) {
    this.config.logger?.log(`Simulate Transaction`)
    const simulation = await this.connection.simulateTransaction(tx)
    return parseTransactionSimulation(simulation.value)
  }

  async healthCheck() {
    this.config.logger?.log(`Health check`)
    const res = await axios.get(`${this.endpoint}/health`)
    return res.data.toString() === 'ok'
  }

  getRecentPerformanceSamples(numberOfSamples: number) {
    return this.connection.getRecentPerformanceSamples(numberOfSamples)
  }
}
