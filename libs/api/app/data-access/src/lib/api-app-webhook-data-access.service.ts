import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { App, AppWebhookType } from '@prisma/client'
import { AxiosRequestHeaders } from 'axios'
import { switchMap } from 'rxjs'
import { AppWebhookDirection } from './entity/app-webhook-direction.enum'

interface WebhookOptions {
  headers?: AxiosRequestHeaders
  payload: any
  type: AppWebhookType
}

@Injectable()
export class ApiAppWebhookDataAccessService {
  private readonly logger = new Logger(ApiAppWebhookDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService, private readonly http: HttpService) {}

  sendWebhook(app: App, options: WebhookOptions) {
    switch (options.type) {
      case AppWebhookType.Event:
        if (!app.webhookEventEnabled) {
          this.logger.warn(`Skip webhook for app ${app.index}, webhookEventEnabled is false`)
          return
        }
        if (!app.webhookEventUrl) {
          this.logger.warn(`Skip webhook for app ${app.index}, webhookEventUrl not set`)
          return
        }
        return this.sendEventWebhook(app, options)
      case AppWebhookType.Verify:
        if (!app.webhookVerifyEnabled) {
          this.logger.warn(`Skip webhook for app ${app.index}, webhookVerifyEnabled is false`)
          return
        }
        if (!app.webhookVerifyUrl) {
          this.logger.warn(`Skip webhook for app ${app.index}, webhookVerifyUrl not set`)
          return
        }
        return this.sendVerifyWebhook(app, options)
      default:
        throw new Error(`Unknown webhook type ${options.type}`)
    }
  }

  private sendEventWebhook(app: App, options: WebhookOptions) {
    return new Promise((resolve, reject) => {
      this.http
        .post(app.webhookEventUrl, options.payload, {
          headers: {
            ...options.headers,
            'content-type': 'application/json',
            'mogami-webhook-type': options.type,
          },
        })
        .pipe(
          switchMap((res) =>
            this.data.appWebhook.create({
              data: {
                app: { connect: { id: app.id } },
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

  private sendVerifyWebhook(app: App, options: WebhookOptions) {
    return new Promise((resolve, reject) =>
      this.http
        .post(app.webhookVerifyUrl, options.payload, {
          headers: {
            ...options.headers,
            'content-type': 'application/json',
            'mogami-webhook-type': options.type,
          },
        })
        .pipe(
          switchMap((res) =>
            this.data.appWebhook.create({
              data: {
                app: { connect: { id: app.id } },
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
}
