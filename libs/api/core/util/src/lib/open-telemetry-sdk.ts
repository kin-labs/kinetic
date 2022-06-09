import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'

import { InstrumentationOption } from '@opentelemetry/instrumentation'
import { MeterProvider } from '@opentelemetry/sdk-metrics-base'

const nestInstrumentation = new NestInstrumentation() as unknown as InstrumentationOption

export class OpenTelementrySdk {
  static otelSdk: NodeSDK
  static meterProvider: MeterProvider
  static metricExporter: PrometheusExporter

  static start() {
    const metricInterval = 1000

    if (!this.metricExporter) {
      this.metricExporter = new PrometheusExporter({
        port: 9461,
      })
    }

    if (!this.meterProvider) {
      this.meterProvider = new MeterProvider({
        exporter: this.metricExporter,
        interval: metricInterval,
      })
    }

    if (!this.otelSdk) {
      this.otelSdk = new NodeSDK({
        metricExporter: this.metricExporter,
        metricInterval,
        contextManager: new AsyncLocalStorageContextManager(),
        instrumentations: [nestInstrumentation],
      })
    }

    return this.otelSdk.start()
  }

  static async shutdown() {
    await this.otelSdk.shutdown()
  }

  static getMetricProvider() {
    if (!this.meterProvider && process.env.ENABLE_METRICS === 'TRUE') {
      this.start()
    }

    return this.meterProvider
  }
}
