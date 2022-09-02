import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { AppWebhookType } from '@prisma/client'
import { AxiosRequestHeaders } from 'axios'
import { Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { switchMap } from 'rxjs'
import { AppEnv } from './entity/app-env.entity'
import { AppTransaction } from './entity/app-transaction.entity'
import { AppWebhookDirection } from './entity/app-webhook-direction.enum'

interface WebhookOptions {
  headers?: AxiosRequestHeaders
  transaction: AppTransaction
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
        if (!appEnv.webhookDebugging) {
          if (!appEnv.webhookEventEnabled) {
            this.logger.warn(`Skip webhook for app ${appKey}, webhookEventEnabled is false`)
            return
          }
          if (!appEnv.webhookEventUrl) {
            this.logger.warn(`Skip webhook for app ${appKey}, webhookEventUrl not set`)
            return
          }
        }
        return this.sendEventWebhook(appEnv, options)
      case AppWebhookType.Verify:
        if (!appEnv.webhookDebugging) {
          if (!appEnv.webhookVerifyEnabled) {
            this.logger.warn(`Skip webhook for app ${appKey}, webhookVerifyEnabled is false`)
            return
          }
          if (!appEnv.webhookVerifyUrl) {
            this.logger.warn(`Skip webhook for app ${appKey}, webhookVerifyUrl not set`)
            return
          }
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
      return res.send(new HttpException(`Unknown AppWebhookType`, HttpStatus.BAD_REQUEST))
    }

    try {
      // Get the app by Index
      const appEnv = await this.data.getAppByEnvironmentIndex(environment, index)
      if (!appEnv.webhookDebugging) {
        this.logger.warn(`storeIncomingWebhook ignoring request, webhookDebugging is disabled`)
        res.statusCode = 400
        return res.send(new Error(`webhookDebugging is disabled`))
      }

      if (!headers['kinetic-tx-id']) {
        return res.send(new Error(`Error finding tx-id`))
      }
      const appTransactionId = headers['kinetic-tx-id'].toString()

      // Store the incoming webhook
      const created = await this.data.appWebhook.create({
        data: {
          direction: AppWebhookDirection.Incoming,
          appEnvId: appEnv.id,
          appTransactionId,
          headers,
          payload,
          type: type === 'event' ? AppWebhookType.Event : AppWebhookType.Verify,
        },
      })
      res.statusCode = 200
      return res.send(created)
    } catch (e) {
      res.statusCode = 400

      return res.send(new HttpException(`Something went wrong storing incoming webhook`, HttpStatus.BAD_REQUEST))
    }
  }

  getDebugUrl(appEnv: AppEnv, type: AppWebhookType, defaultUrl: string) {
    if (!appEnv.webhookDebugging) {
      return defaultUrl
    }
    return `${this.data.config.apiUrl}/app/${appEnv.name}/${appEnv.app?.index}/webhook/${type.toLowerCase()}`
  }

  private sendEventWebhook(appEnv: AppEnv, options: WebhookOptions) {
    const url = this.getDebugUrl(appEnv, options.type, appEnv.webhookEventUrl)
    return new Promise((resolve, reject) => {
      this.http
        .post(url, options.transaction, {
          headers: this.getHeaders(appEnv, options),
        })
        .pipe(
          switchMap((res) =>
            this.data.appWebhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                appTransaction: { connect: { id: options.transaction.id } },
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
    const url = this.getDebugUrl(appEnv, options.type, appEnv.webhookVerifyUrl)
    return new Promise((resolve, reject) =>
      this.http
        .post(url, options.transaction, {
          headers: this.getHeaders(appEnv, options),
        })
        .pipe(
          switchMap((res) =>
            this.data.appWebhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                appTransaction: { connect: { id: options.transaction.id } },
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

  private getHeaders = (appEnv: AppEnv, options: WebhookOptions) => {
    // Pass along any request headers that start with 'kinetic'
    const headers = Object.keys(options.headers)
      .filter((k) => k.startsWith('kinetic-'))
      .reduce((acc, curr) => ({ ...acc, [curr]: options.headers[curr] }), {})

    return {
      ...headers,
      'content-type': 'application/json',
      'kinetic-environment': appEnv.name,
      'kinetic-index': appEnv.app?.index,
      'kinetic-tx-id': options.transaction.id,
      'kinetic-webhook-type': options.type,
    }
  }
}
