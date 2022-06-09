import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'

import { InstrumentationOption } from '@opentelemetry/instrumentation'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { MeterProvider } from '@opentelemetry/sdk-metrics-base'
import { NodeSDK } from '@opentelemetry/sdk-node'

const nestInstrumentation = new NestInstrumentation() as unknown as InstrumentationOption

export class OpenTelementrySdk {
  static otelSdk: NodeSDK
  static meterProvider: MeterProvider
  static metricExporter: PrometheusExporter

  static start(enableMetrics: boolean) {
    if (!enableMetrics) {
      return true
    }
    const metricInterval = 1000

    this.metricExporter = new PrometheusExporter({
      preventServerStart: !enableMetrics,
    })

    this.meterProvider = new MeterProvider({
      exporter: this.metricExporter,
      interval: metricInterval,
    })

    this.otelSdk = new NodeSDK({
      metricExporter: this.metricExporter,
      metricInterval,
      contextManager: new AsyncLocalStorageContextManager(),
      instrumentations: [nestInstrumentation],
    })

    return this.otelSdk.start()
  }

  static async shutdown() {
    await this.otelSdk.shutdown()
  }
}
