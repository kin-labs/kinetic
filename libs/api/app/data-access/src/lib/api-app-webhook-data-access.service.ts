import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AppWebhookType } from '@prisma/client'
import { AxiosRequestHeaders } from 'axios'
import { switchMap } from 'rxjs'
import { AppEnv } from './entity/app-env.entity'
import { AppWebhookDirection } from './entity/app-webhook-direction.enum'

interface WebhookOptions {
  headers?: AxiosRequestHeaders
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
  type: AppWebhookType
}

@Injectable()
export class ApiAppWebhookDataAccessService {
  private readonly logger = new Logger(ApiAppWebhookDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService, private readonly http: HttpService) {}

  sendWebhook(appEnv: AppEnv, options: WebhookOptions) {
    const appKey = this.data.getAppKey(appEnv.name, appEnv.app?.index)
    switch (options.type) {
      case AppWebhookType.Event:
        if (!appEnv.webhookEventEnabled) {
          this.logger.warn(`Skip webhook for app ${appKey}, webhookEventEnabled is false`)
          return
        }
        if (!appEnv.webhookEventUrl) {
          this.logger.warn(`Skip webhook for app ${appKey}, webhookEventUrl not set`)
          return
        }
        return this.sendEventWebhook(appEnv, options)
      case AppWebhookType.Verify:
        if (!appEnv.webhookVerifyEnabled) {
          this.logger.warn(`Skip webhook for app ${appKey}, webhookVerifyEnabled is false`)
          return
        }
        if (!appEnv.webhookVerifyUrl) {
          this.logger.warn(`Skip webhook for app ${appKey}, webhookVerifyUrl not set`)
          return
        }
        return this.sendVerifyWebhook(appEnv, options)
      default:
        throw new Error(`Unknown webhook type ${options.type}`)
    }
  }

  private sendEventWebhook(appEnv: AppEnv, options: WebhookOptions) {
    return new Promise((resolve, reject) => {
      this.http
        .post(appEnv.webhookEventUrl, options.payload, {
          headers: this.getHeaders(appEnv, options),
        })
        .pipe(
          switchMap((res) =>
            this.data.appWebhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                direction: AppWebhookDirection.Outgoing,
                type: options.type,
                responseError: res.statusText,
                responseStatus: res.status,
                responsePayload: res.data,
              },
            }),
          ),
        )
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        })
    })
  }

  private sendVerifyWebhook(appEnv: AppEnv, options: WebhookOptions) {
    return new Promise((resolve, reject) =>
      this.http
        .post(appEnv.webhookVerifyUrl, options.payload, {
          headers: this.getHeaders(appEnv, options),
        })
        .pipe(
          switchMap((res) =>
            this.data.appWebhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                direction: AppWebhookDirection.Outgoing,
                type: options.type,
                responseError: res.statusText,
                responseStatus: res.status,
                responsePayload: res.data,
              },
            }),
          ),
        )
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        }),
    )
  }

  private getHeaders = (appEnv: AppEnv, options: WebhookOptions) => ({
    ...options.headers,
    'content-type': 'application/json',
    'mogami-app-index': appEnv.app?.index,
    'mogami-webhook-type': options.type,
  })
}
