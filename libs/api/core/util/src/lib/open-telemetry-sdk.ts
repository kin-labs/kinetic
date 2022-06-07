import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'

import { InstrumentationOption } from '@opentelemetry/instrumentation'

const nestInstrumentation = new NestInstrumentation() as unknown as InstrumentationOption

export class OpenTelementrySdk {
  static otelSdk: NodeSDK

  static start() {
    if (!this.otelSdk) {
      this.otelSdk = new NodeSDK({
        metricExporter: new PrometheusExporter({
          port: 9461,
        }),
        metricInterval: 1000,
        contextManager: new AsyncLocalStorageContextManager(),
        instrumentations: [nestInstrumentation],
      })
    }

    return this.otelSdk.start()
  }

  static async shutdown() {
    await this.otelSdk.shutdown()
  }
}
