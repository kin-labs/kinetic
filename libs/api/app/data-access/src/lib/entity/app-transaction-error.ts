import { AppTransactionErrorType } from '@prisma/client'

export class AppTransactionError {
  private description: string
  private instruction: number
  private type: AppTransactionErrorType

  constructor(error: any, type: AppTransactionErrorType = AppTransactionErrorType.Unknown) {
    this.description = error.toString()
    this.type = type
    this.parseError(error)
  }

  private parseError(error) {
    const description = error.toString()

    if (description.includes('invalid account data for instruction')) {
      this.instruction = description.split(' ')[11]
      this.type = AppTransactionErrorType.InvalidAccount
    }

    // Add other cases
  }

  getParsedError() {
    return {
      description: this.description,
      instruction: this.instruction,
      type: this.type,
    }
  }

  toString() {
    return this.description
  }
}
