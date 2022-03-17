export interface SdkLogger {
  error: (...params: unknown[]) => void
  log: (...params: unknown[]) => void
}
