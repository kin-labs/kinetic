import { JestExecutorOptions } from '@nrwl/jest/src/executors/jest/schema'

export interface BuildExecutorSchema extends JestExecutorOptions {
  devServerTarget: string
}
