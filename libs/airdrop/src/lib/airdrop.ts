import { getPublicKey, PublicKeyString, TokenBalance } from '@mogami/solana'
import { createAssociatedTokenAccount, transferChecked } from '@solana/spl-token'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { AirdropConfig } from './airdrop-config'
import { AirdropResponse } from './airdrop-response'

export class Airdrop {
  private readonly connection: Connection
  private readonly feePayer: Keypair
  private readonly mint: PublicKey
  constructor(private readonly config: AirdropConfig) {
    this.connection = config.connection
    this.feePayer = config.feePayer
    this.mint = getPublicKey(config.mint)
  }

  async airdrop(account: PublicKeyString, amount?: number | string): Promise<AirdropResponse> {
    amount = amount && amount?.toString()?.length && Number(amount) > 0 ? Number(amount) : this.config.airdropDefault
    if (Number(amount) > this.config.airdropMax) {
      throw new Error(`Try requesting ${this.config.airdropMax} or less.`)
    }
    // Get Fee Payer Accounts
    const fromOwner = this.feePayer.publicKey.toBase58()
    const fromTokenAccount = await this.getOrCreateTokenAccount(this.feePayer.publicKey)
    // Get Destination Accounts
    const toOwner = getPublicKey(account).toBase58()
    const toTokenAccount = await this.getOrCreateTokenAccount(account)

    // Get Pre Balances
    const [fromPreBalance, toPreBalance] = await Promise.all([
      this.getBalances({
        owner: fromOwner,
        tokenAccount: fromTokenAccount,
      }),
      this.getBalances({
        owner: toOwner,
        tokenAccount: toTokenAccount,
      }),
    ])

    // Make transaction
    const signature = await this.sendTokens({
      amount: Number(amount * Math.pow(10, this.config.decimals)),
      toTokenAccount,
      fromTokenAccount,
      fromOwner,
    })

    // Get Post Balances
    const [fromPostBalance, toPostBalance] = await Promise.all([
      this.getBalances({
        owner: fromOwner,
        tokenAccount: fromTokenAccount,
      }),
      this.getBalances({
        owner: toOwner,
        tokenAccount: toTokenAccount,
      }),
    ])

    return {
      config: {
        airdropDefault: this.config.airdropDefault,
        airdropMax: this.config.airdropMax,
        decimals: this.config.decimals,
        feePayer: this.config.feePayer.publicKey.toBase58(),
        mint: this.mint.toBase58(),
      },
      balances: {
        from: {
          owner: fromOwner,
          tokenAccount: fromTokenAccount.toBase58(),
          pre: fromPreBalance,
          post: fromPostBalance,
        },
        to: {
          owner: toOwner,
          tokenAccount: toTokenAccount.toBase58(),
          pre: toPreBalance,
          post: toPostBalance,
        },
      },
      amount,
      signature,
    }
  }

  private async getBalances({ owner, tokenAccount }: { owner: PublicKeyString; tokenAccount: PublicKeyString }) {
    const [ownerBalance, tokenAccountBalance] = await Promise.all([
      this.connection.getBalance(new PublicKey(owner)),
      this.getTokenBalance(tokenAccount),
    ])

    return {
      sol: ownerBalance / LAMPORTS_PER_SOL,
      token: new BigNumber(tokenAccountBalance.balance).toNumber() / Math.pow(10, this.config.decimals),
    }
  }

  private async getOrCreateTokenAccount(account: PublicKeyString): Promise<PublicKey> {
    const result = await this.connection.getTokenAccountsByOwner(getPublicKey(account), { mint: this.mint })
    if (!result?.value?.length) {
      return createAssociatedTokenAccount(this.connection, this.feePayer, this.mint, getPublicKey(account))
    }
    return result?.value?.length ? result.value[0].pubkey : undefined
  }

  private async getTokenBalance(account: PublicKeyString): Promise<TokenBalance> {
    const res = await this.connection.getTokenAccountBalance(getPublicKey(account))
    return {
      account,
      balance: new BigNumber(res.value.amount),
    }
  }

  private async sendTokens({
    amount,
    fromOwner,
    fromTokenAccount,
    toTokenAccount,
  }: {
    amount: bigint | number
    fromOwner: PublicKeyString
    toTokenAccount: PublicKeyString
    fromTokenAccount: PublicKeyString
  }) {
    return transferChecked(
      this.connection,
      this.feePayer,
      getPublicKey(fromTokenAccount),
      this.mint,
      getPublicKey(toTokenAccount),
      getPublicKey(fromOwner),
      amount,
      this.config.decimals,
    )
  }
}
