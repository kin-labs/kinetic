import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { App, AppWebhookType } from '@prisma/client'
import { AxiosRequestHeaders, AxiosResponse } from 'axios'
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
        if (!app.webhookEventUrl) {
          this.logger.verbose(`Skip webhook for app ${app.index}, webhookEventUrl not set`)
          return
        }
        return this.sendEventWebhook(app, options)
      case AppWebhookType.Verify:
        if (!app.webhookVerifyUrl) {
          this.logger.verbose(`Skip webhook for app ${app.index}, webhookVerifyUrl not set`)
          return
        }
        return this.sendVerifyWebhook(app, options)
      default:
        throw new Error(`Unknown webhook type ${options.type}`)
    }
  }

  sendEventWebhook(app: App, options: WebhookOptions) {
    this.logger.log('sendEventWebhook', options)
    return this.http
      .post(app.webhookEventUrl, options.payload, {
        headers: { ...options.headers, 'content-type': 'application/json' },
      })
      .pipe(
        switchMap((res) => {
          console.log(res)
          return this.data.appWebhook.create({
            data: {
              app: { connect: { id: app.id } },
              direction: AppWebhookDirection.Outgoing,
              type: options.type,
              responseError: res.statusText,
              responseStatus: res.status,
              responsePayload: res.data,
            },
          })
        }),
      )
      .subscribe()
  }

  sendVerifyWebhook(app: App, options: WebhookOptions) {
    this.logger.log('sendVerifyWebhook', options)
    return this.http
      .post(app.webhookVerifyUrl, options.payload, {
        headers: { ...options.headers, 'content-type': 'application/json' },
      })
      .pipe(
        switchMap((res) => {
          return this.data.appWebhook.create({
            data: {
              app: { connect: { id: app.id } },
              direction: AppWebhookDirection.Outgoing,
              type: options.type,
              responseError: res.statusText,
              responseStatus: res.status,
              responsePayload: res.data,
            },
          })
        }),
      )
      .subscribe((res) => {
        console.log('res', res)
      })
  }
}
