import { Logger } from '@nestjs/common'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

export class OpenTelementrySdk {
  static sdk: NodeSDK

  static start(metricsEnabled: boolean) {
    if (!metricsEnabled) {
      Logger.verbose(`Metrics disabled`, 'OpenTelementrySdk')
      return true
    }
    Logger.verbose(`Metrics enabled`, 'OpenTelementrySdk')

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
