import { Commitment, convertCommitment, getPublicKey, PublicKeyString } from '@kin-kinetic/solana'
import { BadRequestException } from '@nestjs/common'
import { createAssociatedTokenAccount, transferChecked } from '@solana/spl-token'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
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

  async airdrop(account: PublicKeyString, amount?: number | string, commitment?: Commitment): Promise<AirdropResponse> {
    amount = amount && amount?.toString()?.length && Number(amount) > 0 ? Number(amount) : this.config.airdropAmount
    if (Number(amount) > this.config.airdropMax) {
      throw new BadRequestException(`Try requesting ${this.config.airdropMax} or less.`)
    }
    // Get Fee Payer Accounts
    const fromOwner = this.feePayer.publicKey.toBase58()
    const fromTokenAccount = await this.getOrCreateTokenAccount(this.feePayer.publicKey)
    // Get Destination Accounts
    const toTokenAccount = await this.getOrCreateTokenAccount(account)

    // Make transaction
    const signature = await this.sendTokens({
      amount: Number(amount * Math.pow(10, this.config.decimals)),
      commitment,
      toTokenAccount,
      fromTokenAccount,
      fromOwner,
    })

    return {
      signature,
    }
  }

  private async getOrCreateTokenAccount(account: PublicKeyString): Promise<PublicKey> {
    const result = await this.connection.getTokenAccountsByOwner(getPublicKey(account), { mint: this.mint })
    if (!result?.value?.length) {
      return createAssociatedTokenAccount(this.connection, this.feePayer, this.mint, getPublicKey(account))
    }
    return result?.value?.length ? result.value[0].pubkey : undefined
  }

  private async sendTokens({
    amount,
    commitment,
    fromOwner,
    fromTokenAccount,
    toTokenAccount,
  }: {
    amount: bigint | number
    commitment: Commitment
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
      [],
      {
        commitment: convertCommitment(commitment),
      },
    )
  }
}
