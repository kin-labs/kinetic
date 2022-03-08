import { AccountInfo } from '@solana/web3.js'

enum AccountInfoResponseResult {
  notFound = 'notFound',
  ok = 'ok',
}
export interface AccountInfoResponse {
  account?: AccountInfo<string>
  result: AccountInfoResponseResult
}
