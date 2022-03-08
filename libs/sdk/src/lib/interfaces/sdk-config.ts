import { Http } from '../helpers/http'

export interface SdkConfig {
  endpoint?: string
  http?: Http
  logger?
}
