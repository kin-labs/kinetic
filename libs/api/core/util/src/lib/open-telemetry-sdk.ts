import { Logger } from '@nestjs/common'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { ServerResponse } from 'http'

export class OpenTelementrySdk {
  static sdk: NodeSDK
  private static metricExporter: PrometheusExporter

  static start(metricsEnabled: boolean) {
    if (!metricsEnabled) {
      Logger.verbose(`Metrics are disabled, set METRICS_ENABLED=true to enable them`, 'OpenTelementrySdk')
      return true
    }
    Logger.verbose(`Metrics are enabled`, 'OpenTelementrySdk')

    this.metricExporter = new PrometheusExporter({
      prefix: 'kinetic',
      preventServerStart: true,
    })

    this.sdk = new NodeSDK({
      metricExporter: this.metricExporter,
      metricInterval: 1000,
    })

    return this.sdk.start()
  }

  static async shutdown() {
    await this.sdk.shutdown()
  }

  static getMetrics(response: ServerResponse) {
    if (!this.metricExporter) {
      response.setHeader('content-type', 'text/plain')
      return response.end('Metrics are disabled')
    }
    return this.metricExporter.getMetricsRequestHandler(undefined, response)
  }
}
