export interface AirdropResponse {
  config: {
    airdropAmount: number
    airdropMax: number
    decimals: number
    feePayer: string
    mint: string
  }
  balances: {
    from: {
      owner: string
      tokenAccount: string
      pre: {
        sol: number
        token: number
      }
      post: {
        sol: number
        token: number
      }
    }
    to: {
      owner: string
      tokenAccount: string
      pre: {
        sol: number
        token: number
      }
      post: {
        sol: number
        token: number
      }
    }
  }
  amount: number
  signature: string
}
