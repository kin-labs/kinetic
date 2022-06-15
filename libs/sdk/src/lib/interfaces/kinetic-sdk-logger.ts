export interface KineticSdkLogger {
  error: (...params: unknown[]) => void
  log: (...params: unknown[]) => void
}
