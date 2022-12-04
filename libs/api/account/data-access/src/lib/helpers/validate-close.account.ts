import { BadRequestException } from '@nestjs/common'
import { AccountInfo } from '../entities/account.info'
import { TokenInfo } from '../entities/token-info.entity'

export interface ValidateCloseAccountOptions {
  info: AccountInfo
  mint: string
  mints: string[]
  wallets: string[]
}

export function validateCloseAccount(options: ValidateCloseAccountOptions): TokenInfo {
  if (options.info.isMint) {
    throw new BadRequestException('Cannot close a mint')
  }

  if (options.info.isTokenAccount) {
    // FIXME: Allow closing token accounts directly
    // Currently, we expect the owner account to be provided. The logic here could be changed to looking up the owner.
    throw new BadRequestException('Cannot close a token account')
  }

  if (!options.info.tokens?.length) {
    throw new BadRequestException('Account has no tokens')
  }

  const mint = options.mints.find((mint) => mint === options.mint)

  if (!mint) {
    throw new BadRequestException('Mint not found')
  }

  const mintTokens = options.info.tokens.filter((t) => t.mint === mint)

  if (!mintTokens.length) {
    throw new BadRequestException('Account has no tokens for the specified mint')
  }

  if (mintTokens?.length > 1) {
    // FIXME: Add support for closing multiple accounts
    // Ideally, we can look at closing multiple token accounts from the same fee payer in one single transactions
    throw new BadRequestException(`Can't close account with multiple tokens`)
  }

  // FIXME: Add support for a specific token account, not just the first one
  // Because an account can have multiple token accounts for the same mint, we need to be able to specify which one to close.
  const tokenAccount = mintTokens[0]

  if (!tokenAccount.closeAuthority) {
    throw new BadRequestException('Token account has no close authority')
  }

  const feePayerWallet = options.wallets.find((publicKey) => publicKey === tokenAccount.closeAuthority)

  if (!feePayerWallet) {
    throw new BadRequestException('Token account close authority is not a known wallet')
  }

  if (Number(tokenAccount.balance) > 0) {
    throw new BadRequestException('Cannot close an account with a balance')
  }

  return tokenAccount
}
