import { SendTransactionError } from '@solana/web3.js'

export class TransactionError extends SendTransactionError {
  logs: string[] | undefined
  type: string | undefined
  instruction: number | undefined

  constructor(message: string, logs?: string[], type?: string, instruction?: number) {
    super(message, logs)

    this.logs = logs
    this.type = type
    this.instruction = instruction
  }
}
