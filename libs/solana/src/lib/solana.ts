import { Commitment, Connection, PublicKey } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { parseEndpoint } from './helpers/parse-endpoint'

export interface SolanaConfig {
  logger?
}

export type PublicKeyString = PublicKey | string

export interface TokenBalance {
  account: PublicKeyString
  balance: BigNumber
}

export function getPublicKey(account: PublicKeyString): PublicKey {
  if (typeof account === 'string') {
    return new PublicKey(account)
  }
  return account
}

export class Solana {
  readonly endpoint: string
  readonly connection: Connection

  constructor(endpoint: string, private readonly config?: SolanaConfig) {
    this.endpoint = parseEndpoint(endpoint)
    this.connection = new Connection(this.endpoint)
    config?.logger?.log(`Solana RPC Endpoint: ${this.endpoint}`)
  }

  async getAccountHistory(account: PublicKeyString) {
    const history = await this.connection.getConfirmedSignaturesForAddress2(getPublicKey(account))
    return {
      account,
      history,
    }
  }

  getAccountInfo(accountId: PublicKeyString, { commitment = 'single' }: { commitment?: Commitment }) {
    return this.connection.getParsedAccountInfo(new PublicKey(accountId), commitment)
  }

  async getBalance(accountId: PublicKeyString, mogamiMintPublicKey: PublicKeyString) {
    const balances = await this.getTokenBalances(new PublicKey(accountId), mogamiMintPublicKey)
    return balances.reduce((acc, curr) => acc.plus(curr.balance), new BigNumber(0))
  }

  getMinimumBalanceForRentExemption(dataLength: number) {
    return this.connection.getMinimumBalanceForRentExemption(dataLength)
  }

  getRecentBlockhash() {
    return this.connection.getRecentBlockhash()
  }

  async getTokenAccounts(account: PublicKeyString, mint: PublicKeyString) {
    const res = await this.connection.getTokenAccountsByOwner(getPublicKey(account), { mint: getPublicKey(mint) })
    return res.value.map(({ pubkey }) => pubkey.toBase58())
  }

  getTokenAccountsHistory(accounts: PublicKeyString[]) {
    return Promise.all(accounts.map((account) => this.getAccountHistory(account)))
  }

  async getTokenBalance(account: PublicKeyString): Promise<TokenBalance> {
    const res = await this.connection.getTokenAccountBalance(getPublicKey(account))
    return {
      account,
      balance: new BigNumber(res.value.amount),
    }
  }

  async getTokenBalances(account: PublicKeyString, mint: PublicKeyString): Promise<TokenBalance[]> {
    const tokens = await this.getTokenAccounts(account, mint)
    return Promise.all(tokens.map(async (account) => this.getTokenBalance(account)))
  }

  async getTokenHistory(account: PublicKeyString, mint: PublicKeyString) {
    return this.getTokenAccounts(account, mint).then((accounts) => this.getTokenAccountsHistory(accounts))
  }
}
