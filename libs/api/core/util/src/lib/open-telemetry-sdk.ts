import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'

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
        instrumentations: [getNodeAutoInstrumentations()],
      })
    }

    return this.otelSdk.start()
  }

  static async shutdown() {
    await this.otelSdk.shutdown()
  }
}
