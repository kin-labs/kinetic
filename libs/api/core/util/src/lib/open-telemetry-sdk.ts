import { Logger } from '@nestjs/common'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { ServerResponse } from 'http'

export class OpenTelemetrySdk {
  static sdk: NodeSDK
  private static metricExporter: PrometheusExporter

  static start({ enabled, port }: { enabled: boolean; port: number }) {
    if (!enabled) {
      Logger.verbose(`Metrics are disabled, set METRICS_ENABLED=true to enable them`, 'OpenTelementrySdk')
      return true
    }
    Logger.verbose(`Metrics are enabled`, 'OpenTelemetrySdk')
    if (port > 0) {
      Logger.verbose(`Metrics listening on port ${port}`, 'OpenTelemetrySdk')
    }

    this.metricExporter = new PrometheusExporter({
      prefix: 'kinetic',
      preventServerStart: !port,
      port,
    })

    this.sdk = new NodeSDK({
      metricReader: this.metricExporter,
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
