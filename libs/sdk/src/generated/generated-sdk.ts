/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Mogami
 * @version 1.0
 * @contact
 *
 * The Mogami API description
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  api = {
    /**
     * No description
     *
     * @name ApiCoreFeatureControllerUptime
     * @request GET:/api/uptime
     */
    apiCoreFeatureControllerUptime: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/uptime`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags config
     * @name ApiConfigFeatureControllerConfig
     * @request GET:/api/config
     */
    apiConfigFeatureControllerConfig: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/config`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name ApiAccountFeatureControllerGetAccountInfo
     * @request GET:/api/account/info/{accountId}
     */
    apiAccountFeatureControllerGetAccountInfo: (accountId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/account/info/${accountId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name ApiAccountFeatureControllerGetBalance
     * @request GET:/api/account/balance/{accountId}
     */
    apiAccountFeatureControllerGetBalance: (accountId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/account/balance/${accountId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name ApiAccountFeatureControllerTokenAccounts
     * @request GET:/api/account/token-accounts/{accountId}
     */
    apiAccountFeatureControllerTokenAccounts: (accountId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/account/token-accounts/${accountId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerGetServiceConfig
     * @request GET:/api/transaction/service-config
     */
    apiTransactionFeatureControllerGetServiceConfig: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/transaction/service-config`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerGetMinimumKinVersion
     * @request GET:/api/transaction/minimum-kin-version
     */
    apiTransactionFeatureControllerGetMinimumKinVersion: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/transaction/minimum-kin-version`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerGetRecentBlockhash
     * @request GET:/api/transaction/recent-blockhash
     */
    apiTransactionFeatureControllerGetRecentBlockhash: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/transaction/recent-blockhash`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerGetMinimumBalanceForRentExemption
     * @request GET:/api/transaction/minimum-balance-for-rent-exemption/{dataLength}
     */
    apiTransactionFeatureControllerGetMinimumBalanceForRentExemption: (
      dataLength: number,
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/api/transaction/minimum-balance-for-rent-exemption/${dataLength}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerGetHistory
     * @request GET:/api/transaction/history
     */
    apiTransactionFeatureControllerGetHistory: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/transaction/history`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerSignTransaction
     * @request POST:/api/transaction/sign-transaction
     */
    apiTransactionFeatureControllerSignTransaction: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/transaction/sign-transaction`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transaction
     * @name ApiTransactionFeatureControllerSubmitTransaction
     * @request POST:/api/transaction/submit-transaction
     */
    apiTransactionFeatureControllerSubmitTransaction: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/transaction/submit-transaction`,
        method: 'POST',
        ...params,
      }),
  }
}
