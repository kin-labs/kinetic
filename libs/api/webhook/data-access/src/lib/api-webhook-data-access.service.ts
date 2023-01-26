import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { getAppKey } from '@kin-kinetic/api/core/util'
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { App, AppEnv, Transaction, WebhookDirection, WebhookType } from '@prisma/client'
import { AxiosRequestHeaders } from 'axios'
import { Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { switchMap } from 'rxjs'

interface WebhookOptions {
  balance?: number
  publicKey?: string
  headers?: AxiosRequestHeaders
  type: WebhookType
  transaction?: Transaction
}

function isValidWebhookType(type: string) {
  return Object.keys(WebhookType)
    .map((item) => item.toLowerCase())
    .includes(type.toLowerCase())
}

@Injectable()
export class ApiWebhookDataAccessService {
  private readonly logger = new Logger(ApiWebhookDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService, private readonly http: HttpService) {}

  sendWebhook(appEnv: AppEnv & { app: App }, options: WebhookOptions) {
    const appKey = getAppKey(appEnv.name, appEnv.app?.index)
    switch (options.type) {
      case WebhookType.Balance:
        if (!appEnv.webhookDebugging) {
          if (!appEnv.webhookBalanceEnabled) {
            this.logger.warn(`Skip webhook for app ${appKey}, webhookBalanceEnabled is false`)
            return
          }
          if (!appEnv.webhookBalanceUrl) {
            this.logger.warn(`Skip webhook for app ${appKey}, webhookBalanceUrl not set`)
            return
          }
        }
        return this.sendBalanceWebhook(appEnv, options)
      case WebhookType.Event:
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
      case WebhookType.Verify:
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
    appKey: string,
    type: string,
    headers: IncomingHttpHeaders,
    payload: object,
    res: Response,
  ) {
    // Make sure the webhook type is valid
    if (!isValidWebhookType(type)) {
      res.statusCode = 400
      return res.send(new HttpException(`Unknown WebhookType`, HttpStatus.BAD_REQUEST))
    }

    try {
      // Get the app by Index
      const appEnv = await this.data.getAppEnvironmentByAppKey(appKey)
      if (!appEnv.webhookDebugging) {
        this.logger.warn(`storeIncomingWebhook ignoring request, webhookDebugging is disabled`)
        res.statusCode = 400
        return res.send(new Error(`webhookDebugging is disabled`))
      }

      let webhookType: WebhookType
      if (type.toLowerCase() === WebhookType.Balance.toLowerCase()) {
        webhookType = WebhookType.Balance
      } else if (type.toLowerCase() === WebhookType.Event.toLowerCase()) {
        webhookType = WebhookType.Event
      } else if (type.toLowerCase() === WebhookType.Verify.toLowerCase()) {
        webhookType = WebhookType.Verify
      }

      const transactionId = headers['kinetic-tx-id']?.toString()

      // Store the incoming webhook
      const created = await this.data.webhook.create({
        data: {
          direction: WebhookDirection.Incoming,
          appEnvId: appEnv.id,
          transactionId,
          headers,
          payload,
          type: webhookType,
        },
      })
      res.statusCode = 200
      return res.send(created)
    } catch (e) {
      res.statusCode = 400
      this.logger.error(`Error storing incoming webhook: ${e}`)

      return res.send(new HttpException(`Error storing incoming webhook`, HttpStatus.BAD_REQUEST))
    }
  }

  getDebugUrl(appEnv: AppEnv & { app: App }, type: WebhookType, defaultUrl: string) {
    if (!appEnv.webhookDebugging) {
      return defaultUrl
    }
    return `${this.data.config.apiUrl}/app/${appEnv.name}/${appEnv.app?.index}/webhook/${type.toLowerCase()}`
  }

  private sendBalanceWebhook(appEnv: AppEnv & { app: App }, options: WebhookOptions) {
    const url = this.getDebugUrl(appEnv, options.type, appEnv.webhookBalanceUrl)
    const headers = this.getAppEnvHeaders(appEnv, options)
    const payload = { balance: options.balance, publicKey: options.publicKey }
    return new Promise((resolve, reject) => {
      this.http
        .post(url, payload, { headers })
        .pipe(
          switchMap((res) =>
            this.data.webhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                direction: WebhookDirection.Outgoing,
                headers,
                payload: JSON.parse(JSON.stringify(payload)),
                responseError: res.statusText,
                responsePayload: res.data,
                responseStatus: res.status,
                type: options.type,
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

  private sendEventWebhook(appEnv: AppEnv & { app: App }, options: WebhookOptions) {
    const url = this.getDebugUrl(appEnv, options.type, appEnv.webhookEventUrl)
    const headers = this.getTxHeaders(appEnv, options)
    const payload = options.transaction
    return new Promise((resolve, reject) => {
      this.http
        .post(url, payload, { headers })
        .pipe(
          switchMap((res) =>
            this.data.webhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                direction: WebhookDirection.Outgoing,
                headers,
                payload: JSON.parse(JSON.stringify(payload)),
                reference: options?.transaction?.reference,
                responseError: res.statusText,
                responsePayload: res.data,
                responseStatus: res.status,
                transaction: { connect: { id: options.transaction.id } },
                type: options.type,
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

  private sendVerifyWebhook(appEnv: AppEnv & { app: App }, options: WebhookOptions) {
    const url = this.getDebugUrl(appEnv, options.type, appEnv.webhookVerifyUrl)
    const headers = this.getTxHeaders(appEnv, options)
    const payload = options.transaction
    return new Promise((resolve, reject) =>
      this.http
        .post(url, payload, { headers })
        .pipe(
          switchMap((res) =>
            this.data.webhook.create({
              data: {
                appEnv: { connect: { id: appEnv.id } },
                direction: WebhookDirection.Outgoing,
                headers,
                payload: JSON.parse(JSON.stringify(payload)),
                reference: options?.transaction?.reference,
                responseError: res.statusText,
                responsePayload: res.data,
                responseStatus: res.status,
                transaction: { connect: { id: options.transaction.id } },
                type: options.type,
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

  private getTxHeaders = (appEnv: AppEnv & { app: App }, options: WebhookOptions) => {
    // Pass along any request headers that start with 'kinetic'
    const headers = Object.keys(options.headers || {})
      .filter((k) => k.startsWith('kinetic-'))
      .reduce((acc, curr) => ({ ...acc, [curr]: options.headers[curr] }), {})

    return this.getAppEnvHeaders(appEnv, {
      ...options,
      headers: {
        ...headers,
        'kinetic-tx-id': options.transaction?.id ? options.transaction.id : 'N/A',
      },
    })
  }

  private getAppEnvHeaders = (appEnv: AppEnv & { app: App }, options: WebhookOptions) => {
    return {
      ...options.headers,
      'kinetic-environment': appEnv.name,
      'kinetic-index': appEnv.app?.index,
      'content-type': 'application/json',
      'kinetic-webhook-type': options.type,
    }
  }
}
