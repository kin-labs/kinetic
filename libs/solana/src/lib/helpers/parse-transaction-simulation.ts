import { SimulatedTransactionResponse } from '@solana/web3.js'
import { TransactionError } from './transaction-error'

const errorMessageMap = {
  0: {
    type: 'CUSTOM_ZERO',
    message: 'Account already exists.',
  },
  1: {
    type: 'InsufficientFunds',
    message: 'Insufficient funds.',
  },
  InvalidAccountData: {
    type: 'InvalidAccountData',
    message: 'Insufficient funds.',
  },
}

export function parseTransactionSimulation(simulation: SimulatedTransactionResponse) {
  const logs = simulation.logs ? simulation.logs : undefined
  if (simulation?.err && typeof simulation.err === 'object' && 'InstructionError' in simulation.err) {
    const [instructionIndex, instructionError] = simulation.err['InstructionError'] as [number, string?]
    const { Custom } = instructionError as any
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error = Custom !== undefined ? errorMessageMap[Custom] : errorMessageMap[instructionError]
    error.instruction = instructionIndex
    throw new TransactionError(error.message, logs, error.type, error.instruction)
  }

  return simulation
}
