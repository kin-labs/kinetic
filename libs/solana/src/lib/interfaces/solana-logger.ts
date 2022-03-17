export interface SolanaLogger {
  error: (...params: unknown[]) => void
  log: (...params: unknown[]) => void
}
