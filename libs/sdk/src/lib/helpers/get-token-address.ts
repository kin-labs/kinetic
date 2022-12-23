import { getPublicKey } from '@kin-kinetic/solana'
import { getAssociatedTokenAddress } from '@solana/spl-token'

export async function getTokenAddress({ account, mint }: { account: string; mint: string }): Promise<string> {
  const address = await getAssociatedTokenAddress(getPublicKey(mint), getPublicKey(account))

  return address.toString()
}
