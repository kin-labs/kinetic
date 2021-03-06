import { SimulatedTransactionResponse } from '@solana/web3.js'
import { TransactionError } from './transaction-error'

function errorMessageMap(index: number | string | undefined) {
  switch (index) {
    case 0:
      return {
        type: 'CUSTOM_ZERO',
        message: 'Account already exists.',
      }
    case 1:
      return {
        type: 'InsufficientFunds',
        message: 'Insufficient funds.',
      }
    case 'InvalidAccountData':
      return {
        type: 'InvalidAccountData',
        message: 'Insufficient funds.',
      }
    default:
      return {
        type: 'Unknown',
        message: 'Unknown error.',
      }
  }
}

export function parseTransactionSimulation(simulation: SimulatedTransactionResponse) {
  const logs = simulation.logs ? simulation.logs : undefined
  if (simulation?.err && typeof simulation.err === 'object' && 'InstructionError' in simulation.err) {
    const [instructionIndex, instructionError] = simulation.err['InstructionError'] as [number, string?]
    const { Custom } = instructionError as any
    const error = Custom !== undefined ? errorMessageMap(Custom) : errorMessageMap(instructionError)
    throw new TransactionError(error.message, logs, error.type, instructionIndex)
  }

  return simulation
}
