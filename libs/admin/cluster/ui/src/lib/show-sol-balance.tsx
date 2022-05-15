import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import React from 'react'

export function ShowSolBalance({ balance }: { balance?: number | null | undefined }) {
  return <span>{balance ? balance / LAMPORTS_PER_SOL : 0} SOL</span>
}
