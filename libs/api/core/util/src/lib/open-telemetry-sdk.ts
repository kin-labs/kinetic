import { Logger } from '@nestjs/common'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'

export class OpenTelementrySdk {
  static sdk: NodeSDK

  static start(metricsEnabled: boolean) {
    if (!metricsEnabled) {
      Logger.verbose(`Metrics are disabled, set METRICS_ENABLED=true to enable them`, 'OpenTelementrySdk')
      return true
    }
    Logger.verbose(`Metrics are enabled`, 'OpenTelementrySdk')

    const metricExporter = new PrometheusExporter({
      prefix: 'mogami',
      preventServerStart: !metricsEnabled,
    })

    this.sdk = new NodeSDK({
      metricExporter,
      metricInterval: 1000,
    })

    return this.sdk.start()
  }

  static async shutdown() {
    await this.sdk.shutdown()
  }
}
