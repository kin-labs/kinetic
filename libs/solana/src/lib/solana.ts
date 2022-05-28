import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { convertCommitment, getPublicKey, parseEndpoint } from './helpers'
import { Commitment, PublicKeyString, SolanaConfig, TokenBalance } from './interfaces'

export class Solana {
  readonly endpoint: string
  readonly connection: Connection

  constructor(endpoint: string, private readonly config: SolanaConfig = {}) {
    this.endpoint = parseEndpoint(endpoint)
    this.connection = new Connection(this.endpoint)
    config.logger?.log(`Solana RPC Endpoint: ${this.endpoint}`)
  }

  confirmTransaction(signature: string, commitment: Commitment = Commitment.Finalized) {
    return this.connection.confirmTransaction(signature, convertCommitment(commitment))
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
      return error
    }
  }

  getAccountInfo(accountId: PublicKeyString, { commitment = Commitment.Confirmed }: { commitment?: Commitment }) {
    this.config.logger?.log(`Getting account info: ${accountId}`)
    return this.connection.getParsedAccountInfo(new PublicKey(accountId), convertCommitment(commitment))
  }

  async getBalance(accountId: PublicKeyString, mogamiMintPublicKey: PublicKeyString) {
    this.config.logger?.log(`Getting account balance: ${accountId}`)
    try {
      const balances = await this.getTokenBalances(new PublicKey(accountId), mogamiMintPublicKey)
      return balances.reduce((acc, curr) => acc.plus(curr.balance), new BigNumber(0))
    } catch (error) {
      throw new Error('No Kin token accounts found')
    }
  }

  async getBalanceSol(accountId: PublicKeyString): Promise<number> {
    this.config.logger?.log(`Getting account balance: ${accountId}`)
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
    this.config.logger?.log(`Getting token account: ${getPublicKey(account)}`)
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
    this.config.logger?.log(`Getting token history: ${getPublicKey(account)}`)
    return this.getTokenAccounts(account, mint).then((accounts) => this.getTokenAccountsHistory(accounts))
  }

  requestAirdrop(account: PublicKeyString, amount: number) {
    this.config.logger?.log(`Request Airdrop: ${getPublicKey(account)} ${amount}`)
    return this.connection.requestAirdrop(getPublicKey(account), amount)
  }

  sendRawTransaction(tx: Transaction) {
    this.config.logger?.log(`Send Raw Transaction`)
    return this.connection.sendRawTransaction(tx.serialize())
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
