import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { convertCommitment, getPublicKey, parseEndpoint, parseTransactionSimulation, TransactionError } from './helpers'
import {
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
    config.logger?.log(`Solana RPC Endpoint: ${this.endpoint}`)
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

  getAccountInfo(accountId: PublicKeyString, { commitment = Commitment.Confirmed }: { commitment?: Commitment }) {
    this.config.logger?.log(`Getting account info: ${accountId}`)
    return this.connection.getParsedAccountInfo(new PublicKey(accountId), convertCommitment(commitment))
  }

  async getBalance(accountId: PublicKeyString, mints: string | string[]): Promise<BalanceSummary> {
    mints = Array.isArray(mints) ? mints : [mints]
    this.config.logger?.log(`Getting account balance summary: ${accountId} for mints ${mints.join(', ')}`)

    if (!mints.length) {
      throw new Error(`getBalance: No mints provided.`)
    }
    const defaultMint = mints[0]
    try {
      const tokens: BalanceToken[] = []

      const tokenAccountResult: PromiseSettledResult<{ mint: string; accounts: string[] }>[] = await Promise.allSettled(
        mints.map((mint) => {
          return this.getTokenAccounts(accountId, mint).then((accounts) => ({ mint, accounts }))
        }),
      )
      const tokenAccounts = tokenAccountResult
        .filter((item) => item.status === 'fulfilled')
        .map((item) => (item as PromiseFulfilledResult<{ mint: string; accounts: string[] }>).value)

      const mintMap: Record<string, string[]> = mints.reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: tokenAccounts.find((ta) => ta.mint === curr)?.accounts || [],
        }
      }, {})

      for (const { mint, accounts } of tokenAccounts) {
        for (const account of accounts) {
          const { balance } = await this.getTokenBalance(account)
          tokens.push({ account, mint, balance })
        }
      }

      const mintBalance: BalanceMintMap = tokens.reduce<BalanceMintMap>((acc, { mint, balance }) => {
        const current = acc[mint] ? acc[mint] : new BigNumber(0)

        return { ...acc, [mint]: current.plus(balance) }
      }, {})

      return {
        balance: mintBalance[defaultMint] ? mintBalance[defaultMint] : new BigNumber(0),
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

  async getTokenBalance(account: PublicKeyString): Promise<TokenBalance> {
    this.config.logger?.log(`Getting token balance: ${getPublicKey(account)}`)
    const res = await this.connection.getTokenAccountBalance(getPublicKey(account))
    return {
      account,
      balance: new BigNumber(res.value.amount),
    }
  }

  async getTokenBalances(account: PublicKeyString, mint: PublicKeyString): Promise<TokenBalance[]> {
    this.config.logger?.log(`Getting token balances: ${getPublicKey(account)}`)
    const tokens = await this.getTokenAccounts(account, mint)
    return Promise.all(tokens.map(async (account) => this.getTokenBalance(account)))
  }

  async getTokenHistory(account: PublicKeyString, mint: PublicKeyString) {
    this.config.logger?.log(`Getting token history: ${getPublicKey(account)} / ${getPublicKey(mint)} `)
    return this.getTokenAccounts(account, mint).then((accounts) => this.getTokenAccountsHistory(accounts))
  }

  requestAirdrop(account: PublicKeyString, amount: number) {
    this.config.logger?.log(`Request Airdrop: ${getPublicKey(account)} ${amount}`)
    return this.connection.requestAirdrop(getPublicKey(account), amount)
  }

  async sendRawTransaction(tx: Transaction) {
    await this.simulateTransaction(tx)
    this.config.logger?.log(`Send Raw Transaction`)
    return this.connection.sendRawTransaction(tx.serialize())
  }

  async simulateTransaction(tx: Transaction) {
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
