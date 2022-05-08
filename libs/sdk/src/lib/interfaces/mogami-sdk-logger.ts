export interface MogamiSdkLogger {
  error: (...params: unknown[]) => void
  log: (...params: unknown[]) => void
}
