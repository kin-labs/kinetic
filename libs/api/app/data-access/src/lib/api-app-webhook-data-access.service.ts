import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { AppWebhookType } from '@prisma/client'
import { AxiosRequestHeaders } from 'axios'
import { Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { switchMap } from 'rxjs'
import { AppEnv } from './entity/app-env.entity'
import { AppWebhookDirection } from './entity/app-webhook-direction.enum'

interface WebhookOptions {
  headers?: AxiosRequestHeaders
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
  type: AppWebhookType
}

function isValidAppWebhookType(type: string) {
  return Object.keys(AppWebhookType)
    .map((item) => item.toLowerCase())
    .includes(type.toLowerCase())
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

  async storeIncomingWebhook(
    environment: string,
    index: number,
    type: string,
    headers: IncomingHttpHeaders,
    payload: object,
    res: Response,
  ) {
    // Make sure the webhook type is valid
    if (!isValidAppWebhookType(type)) {
      res.statusCode = 400
      return res.send(new BadRequestException(`Unknown AppWebhookType`))
    }

    try {
      // Get the app by Index
      const appEnv = await this.data.getAppByEnvironmentIndex(environment, index)
      if (!appEnv.webhookAcceptIncoming) {
        this.logger.warn(`storeIncomingWebhook ignoring request, webhookAcceptIncoming is disabled`)
        res.statusCode = 400
        return res.send(new Error(`webhookAcceptIncoming is disabled`))
      }

      // Store the incoming webhook
      const created = await this.data.appWebhook.create({
        data: {
          direction: AppWebhookDirection.Incoming,
          appEnvId: appEnv.id,
          headers,
          payload,
          type: type === 'event' ? AppWebhookType.Event : AppWebhookType.Verify,
        },
      })
      res.statusCode = 200
      return res.send(created)
    } catch (e) {
      res.statusCode = 400
      return res.send(new BadRequestException(`Something went wrong storing incoming webhook`))
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
