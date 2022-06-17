import { SimulatedTransactionResponse } from '@solana/web3.js'
import { TransactionError } from './transaction-error'

export function parseTransactionSimulation(simulation: SimulatedTransactionResponse) {
  const logs = simulation.logs ? simulation.logs : undefined
  if (simulation.err) {
    const error = {
      message: `Error: failed to send transaction ${logs?.join('\n')}`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      instruction: simulation.err['InstructionError'][0],
      type:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        typeof simulation.err['InstructionError'][1] === 'string'
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            simulation.err['InstructionError'][1]
          : undefined,
    }

    throw new TransactionError(error.message, logs, error.type, error.instruction)
  }

  return simulation
}
