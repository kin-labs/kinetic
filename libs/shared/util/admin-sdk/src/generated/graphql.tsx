/* eslint-disable */
import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type App = {
  __typename?: 'App'
  createdAt: Scalars['DateTime']
  envs?: Maybe<Array<AppEnv>>
  id: Scalars['String']
  index: Scalars['Int']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  users?: Maybe<Array<AppUser>>
}

export type AppCreateInput = {
  index: Scalars['Int']
  name: Scalars['String']
  skipWalletCreation?: InputMaybe<Scalars['Boolean']>
}

export type AppEnv = {
  __typename?: 'AppEnv'
  app?: Maybe<App>
  cluster?: Maybe<Cluster>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  key?: Maybe<Scalars['String']>
  mints?: Maybe<Array<AppMint>>
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  wallets?: Maybe<Array<Wallet>>
  webhookAcceptIncoming?: Maybe<Scalars['Boolean']>
  webhookEventEnabled?: Maybe<Scalars['Boolean']>
  webhookEventUrl?: Maybe<Scalars['String']>
  webhookSecret?: Maybe<Scalars['String']>
  webhookVerifyEnabled?: Maybe<Scalars['Boolean']>
  webhookVerifyUrl?: Maybe<Scalars['String']>
}

export type AppEnvUpdateInput = {
  webhookAcceptIncoming?: InputMaybe<Scalars['Boolean']>
  webhookEventEnabled?: InputMaybe<Scalars['Boolean']>
  webhookEventUrl?: InputMaybe<Scalars['String']>
  webhookSecret?: InputMaybe<Scalars['String']>
  webhookVerifyEnabled?: InputMaybe<Scalars['Boolean']>
  webhookVerifyUrl?: InputMaybe<Scalars['String']>
}

export type AppMint = {
  __typename?: 'AppMint'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  mint?: Maybe<Mint>
  order?: Maybe<Scalars['Int']>
  updatedAt: Scalars['DateTime']
  wallet?: Maybe<Wallet>
}

export type AppTransaction = {
  __typename?: 'AppTransaction'
  amount?: Maybe<Scalars['Int']>
  createdAt?: Maybe<Scalars['DateTime']>
  destination?: Maybe<Scalars['String']>
  errors?: Maybe<Array<AppTransactionError>>
  explorerUrl?: Maybe<Scalars['String']>
  feePayer?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  mint?: Maybe<Scalars['String']>
  processingDuration?: Maybe<Scalars['Int']>
  referenceId?: Maybe<Scalars['String']>
  referenceType?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  solanaCommitted?: Maybe<Scalars['DateTime']>
  solanaCommittedDuration?: Maybe<Scalars['Int']>
  solanaFinalized?: Maybe<Scalars['DateTime']>
  solanaFinalizedDuration?: Maybe<Scalars['Int']>
  solanaStart?: Maybe<Scalars['DateTime']>
  solanaTransaction?: Maybe<Scalars['JSON']>
  source?: Maybe<Scalars['String']>
  status: AppTransactionStatus
  totalDuration?: Maybe<Scalars['Int']>
  updatedAt?: Maybe<Scalars['DateTime']>
  webhookEventDuration?: Maybe<Scalars['Int']>
  webhookEventEnd?: Maybe<Scalars['DateTime']>
  webhookEventIncoming?: Maybe<AppWebhook>
  webhookEventOutgoing?: Maybe<AppWebhook>
  webhookEventStart?: Maybe<Scalars['DateTime']>
  webhookVerifyDuration?: Maybe<Scalars['Int']>
  webhookVerifyEnd?: Maybe<Scalars['DateTime']>
  webhookVerifyIncoming?: Maybe<AppWebhook>
  webhookVerifyOutgoing?: Maybe<AppWebhook>
  webhookVerifyStart?: Maybe<Scalars['DateTime']>
}

export type AppTransactionError = {
  __typename?: 'AppTransactionError'
  id?: Maybe<Scalars['String']>
  instruction?: Maybe<Scalars['Int']>
  message?: Maybe<Scalars['String']>
  type: AppTransactionErrorType
}

export enum AppTransactionErrorType {
  BadNonce = 'BadNonce',
  InvalidAccount = 'InvalidAccount',
  SomeError = 'SomeError',
  Unknown = 'Unknown',
  WebhookFailed = 'WebhookFailed',
}

export type AppTransactionListInput = {
  referenceId?: InputMaybe<Scalars['String']>
  referenceType?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  source?: InputMaybe<Scalars['String']>
  status?: InputMaybe<AppTransactionStatus>
}

export enum AppTransactionStatus {
  Committed = 'Committed',
  Confirmed = 'Confirmed',
  Failed = 'Failed',
  Finalized = 'Finalized',
  Processing = 'Processing',
}

export type AppUpdateInput = {
  name?: InputMaybe<Scalars['String']>
}

export type AppUser = {
  __typename?: 'AppUser'
  app?: Maybe<App>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  role: AppUserRole
  updatedAt: Scalars['DateTime']
  user?: Maybe<User>
}

export type AppUserAddInput = {
  role: AppUserRole
  userId: Scalars['String']
}

export type AppUserRemoveInput = {
  userId: Scalars['String']
}

export enum AppUserRole {
  Member = 'Member',
  Owner = 'Owner',
}

export type AppUserUpdateRoleInput = {
  role: AppUserRole
  userId: Scalars['String']
}

export type AppWebhook = {
  __typename?: 'AppWebhook'
  createdAt: Scalars['DateTime']
  direction: AppWebhookDirection
  headers?: Maybe<Scalars['JSON']>
  id: Scalars['String']
  payload?: Maybe<Scalars['JSON']>
  responseError?: Maybe<Scalars['String']>
  responsePayload?: Maybe<Scalars['JSON']>
  responseStatus?: Maybe<Scalars['Int']>
  type: AppWebhookType
  updatedAt: Scalars['DateTime']
}

export enum AppWebhookDirection {
  Incoming = 'Incoming',
  Outgoing = 'Outgoing',
}

export enum AppWebhookType {
  Event = 'Event',
  Verify = 'Verify',
}

export type AuthToken = {
  __typename?: 'AuthToken'
  token: Scalars['String']
  user: User
}

export type Cluster = {
  __typename?: 'Cluster'
  createdAt?: Maybe<Scalars['DateTime']>
  enableStats?: Maybe<Scalars['Boolean']>
  endpoint?: Maybe<Scalars['String']>
  explorer?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  mints?: Maybe<Array<Mint>>
  name?: Maybe<Scalars['String']>
  status?: Maybe<ClusterStatus>
  type?: Maybe<ClusterType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type ClusterCreateInput = {
  endpoint: Scalars['String']
  explorer?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  type: ClusterType
}

export type ClusterStat = {
  __typename?: 'ClusterStat'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  numSlots?: Maybe<Scalars['Float']>
  numTransactions: Scalars['Float']
  samplePeriodSecs: Scalars['Float']
  slot: Scalars['Float']
  updatedAt: Scalars['DateTime']
}

export enum ClusterStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type ClusterToken = {
  __typename?: 'ClusterToken'
  address?: Maybe<Scalars['String']>
  decimals?: Maybe<Scalars['Int']>
  extensions?: Maybe<ClusterTokenExtensions>
  logoURI?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  symbol?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Scalars['String']>>
}

export type ClusterTokenExtensions = {
  __typename?: 'ClusterTokenExtensions'
  address?: Maybe<Scalars['String']>
  assetContract?: Maybe<Scalars['String']>
  bridgeContract?: Maybe<Scalars['String']>
  coinGeckoId?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  explorer?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  medium?: Maybe<Scalars['String']>
  serumV3Usdc?: Maybe<Scalars['String']>
  serumV3Usdt?: Maybe<Scalars['String']>
  tgann?: Maybe<Scalars['String']>
  tggroup?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

export type ClusterTokenInput = {
  address?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  symbol?: InputMaybe<Scalars['String']>
  type: ClusterType
}

export enum ClusterType {
  Custom = 'Custom',
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
  SolanaTestnet = 'SolanaTestnet',
}

export type ClusterUpdateInput = {
  enableStats?: InputMaybe<Scalars['Boolean']>
  endpoint?: InputMaybe<Scalars['String']>
  explorer?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  status?: InputMaybe<ClusterStatus>
}

export type LoginInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type Mint = {
  __typename?: 'Mint'
  address?: Maybe<Scalars['String']>
  airdropAmount?: Maybe<Scalars['Int']>
  airdropMax?: Maybe<Scalars['Int']>
  airdropPublicKey?: Maybe<Scalars['String']>
  coinGeckoId?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  decimals?: Maybe<Scalars['Int']>
  default?: Maybe<Scalars['Boolean']>
  enabled?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  logoUrl?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  symbol?: Maybe<Scalars['String']>
  type?: Maybe<MintType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type MintAddInput = {
  address: Scalars['String']
  clusterId: Scalars['String']
  name: Scalars['String']
  symbol: Scalars['String']
}

export enum MintType {
  SplToken = 'SplToken',
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddClusterMint?: Maybe<Cluster>
  adminCreateApp?: Maybe<App>
  adminCreateCluster?: Maybe<Cluster>
  adminCreateUser?: Maybe<User>
  adminDeleteApp?: Maybe<App>
  adminDeleteCluster?: Maybe<Cluster>
  adminDeleteUser?: Maybe<User>
  adminDeleteWallet?: Maybe<Wallet>
  adminUpdateCluster?: Maybe<Cluster>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<AuthToken>
  logout?: Maybe<Scalars['Boolean']>
  userAppEnvMintDisable?: Maybe<AppEnv>
  userAppEnvMintEnable?: Maybe<AppEnv>
  userAppEnvMintSetWallet?: Maybe<AppEnv>
  userAppEnvWalletAdd?: Maybe<AppEnv>
  userAppEnvWalletRemove?: Maybe<AppEnv>
  userAppUserAdd?: Maybe<App>
  userAppUserRemove?: Maybe<App>
  userAppUserUpdateRole?: Maybe<App>
  userDeleteWallet?: Maybe<Wallet>
  userGenerateWallet?: Maybe<Wallet>
  userImportWallet?: Maybe<Wallet>
  userUpdateApp?: Maybe<App>
  userUpdateAppEnv?: Maybe<AppEnv>
}

export type MutationAdminAddClusterMintArgs = {
  input: MintAddInput
}

export type MutationAdminCreateAppArgs = {
  input: AppCreateInput
}

export type MutationAdminCreateClusterArgs = {
  input: ClusterCreateInput
}

export type MutationAdminCreateUserArgs = {
  input: UserCreateInput
}

export type MutationAdminDeleteAppArgs = {
  appId: Scalars['String']
}

export type MutationAdminDeleteClusterArgs = {
  clusterId: Scalars['String']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminDeleteWalletArgs = {
  walletId: Scalars['String']
}

export type MutationAdminUpdateClusterArgs = {
  clusterId: Scalars['String']
  input: ClusterUpdateInput
}

export type MutationAdminUpdateUserArgs = {
  input: UserUpdateInput
  userId: Scalars['String']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationUserAppEnvMintDisableArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  mintId: Scalars['String']
}

export type MutationUserAppEnvMintEnableArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  mintId: Scalars['String']
}

export type MutationUserAppEnvMintSetWalletArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  mintId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationUserAppEnvWalletAddArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationUserAppEnvWalletRemoveArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationUserAppUserAddArgs = {
  appId: Scalars['String']
  input: AppUserAddInput
}

export type MutationUserAppUserRemoveArgs = {
  appId: Scalars['String']
  input: AppUserRemoveInput
}

export type MutationUserAppUserUpdateRoleArgs = {
  appId: Scalars['String']
  input: AppUserUpdateRoleInput
}

export type MutationUserDeleteWalletArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationUserGenerateWalletArgs = {
  appEnvId: Scalars['String']
}

export type MutationUserImportWalletArgs = {
  appEnvId: Scalars['String']
  secretKey: Scalars['String']
}

export type MutationUserUpdateAppArgs = {
  appId: Scalars['String']
  input: AppUpdateInput
}

export type MutationUserUpdateAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  input: AppEnvUpdateInput
}

export type Query = {
  __typename?: 'Query'
  adminApp?: Maybe<App>
  adminApps?: Maybe<Array<App>>
  adminCluster?: Maybe<Cluster>
  adminClusterTokens?: Maybe<Array<ClusterToken>>
  adminClusters?: Maybe<Array<Cluster>>
  adminUser?: Maybe<User>
  adminUsers?: Maybe<Array<User>>
  adminWallet?: Maybe<Wallet>
  adminWalletBalances?: Maybe<Array<WalletBalance>>
  adminWallets?: Maybe<Array<Wallet>>
  clusterStats?: Maybe<Array<ClusterStat>>
  me?: Maybe<User>
  uptime: Scalars['Float']
  userApp?: Maybe<App>
  userAppEnv?: Maybe<AppEnv>
  userAppRole?: Maybe<AppUserRole>
  userAppTransaction?: Maybe<AppTransaction>
  userAppTransactions?: Maybe<Array<AppTransaction>>
  userApps?: Maybe<Array<App>>
  userWallet?: Maybe<Wallet>
  userWalletAirdrop?: Maybe<WalletAirdropResponse>
  userWalletBalance?: Maybe<WalletBalance>
  userWalletBalances?: Maybe<Array<WalletBalance>>
  userWallets?: Maybe<Array<Wallet>>
}

export type QueryAdminAppArgs = {
  appId: Scalars['String']
}

export type QueryAdminClusterArgs = {
  clusterId: Scalars['String']
}

export type QueryAdminClusterTokensArgs = {
  input: ClusterTokenInput
}

export type QueryAdminUserArgs = {
  userId: Scalars['String']
}

export type QueryAdminWalletArgs = {
  walletId: Scalars['String']
}

export type QueryAdminWalletBalancesArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryClusterStatsArgs = {
  clusterId: Scalars['String']
}

export type QueryUserAppArgs = {
  appId: Scalars['String']
}

export type QueryUserAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
}

export type QueryUserAppRoleArgs = {
  appId: Scalars['String']
}

export type QueryUserAppTransactionArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  appTransactionId: Scalars['String']
}

export type QueryUserAppTransactionsArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  input?: InputMaybe<AppTransactionListInput>
}

export type QueryUserWalletArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryUserWalletAirdropArgs = {
  amount: Scalars['Float']
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryUserWalletBalanceArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryUserWalletBalancesArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryUserWalletsArgs = {
  appEnvId: Scalars['String']
}

export type User = {
  __typename?: 'User'
  apps?: Maybe<Array<AppUser>>
  avatarUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  emails?: Maybe<Array<UserEmail>>
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  role?: Maybe<UserRole>
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserCreateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  role?: InputMaybe<UserRole>
  username?: InputMaybe<Scalars['String']>
}

export type UserEmail = {
  __typename?: 'UserEmail'
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export type UserUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
}

export type Wallet = {
  __typename?: 'Wallet'
  appEnvs?: Maybe<Array<AppEnv>>
  appMints?: Maybe<Array<AppMint>>
  balances?: Maybe<Array<WalletBalance>>
  createdAt?: Maybe<Scalars['DateTime']>
  id: Scalars['String']
  owner?: Maybe<User>
  publicKey?: Maybe<Scalars['String']>
  type?: Maybe<WalletType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type WalletAirdropResponse = {
  __typename?: 'WalletAirdropResponse'
  signature?: Maybe<Scalars['String']>
}

export type WalletBalance = {
  __typename?: 'WalletBalance'
  appEnv?: Maybe<AppEnv>
  balance?: Maybe<Scalars['BigInt']>
  change?: Maybe<Scalars['BigInt']>
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export enum WalletType {
  Generated = 'Generated',
  Imported = 'Imported',
  Provisioned = 'Provisioned',
}

export type AdminCreateAppMutationVariables = Exact<{
  input: AppCreateInput
}>

export type AdminCreateAppMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      wallets?: Array<{
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      }> | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type AdminDeleteAppMutationVariables = Exact<{
  appId: Scalars['String']
}>

export type AdminDeleteAppMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
  } | null
}

export type AdminAppsQueryVariables = Exact<{ [key: string]: never }>

export type AdminAppsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
  }> | null
}

export type AdminAppQueryVariables = Exact<{
  appId: Scalars['String']
}>

export type AdminAppQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      wallets?: Array<{
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      }> | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type AppDetailsFragment = {
  __typename?: 'App'
  id: string
  createdAt: any
  updatedAt: any
  index: number
  name?: string | null
}

export type AppEnvDetailsFragment = {
  __typename?: 'AppEnv'
  id: string
  createdAt: any
  updatedAt: any
  key?: string | null
  name?: string | null
  webhookAcceptIncoming?: boolean | null
  webhookEventEnabled?: boolean | null
  webhookEventUrl?: string | null
  webhookSecret?: string | null
  webhookVerifyEnabled?: boolean | null
  webhookVerifyUrl?: string | null
  app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
  cluster?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      airdropAmount?: number | null
      airdropMax?: number | null
      airdropPublicKey?: string | null
      coinGeckoId?: string | null
      decimals?: number | null
      default?: boolean | null
      enabled?: boolean | null
      logoUrl?: string | null
      name?: string | null
      order?: number | null
      symbol?: string | null
      type?: MintType | null
    }> | null
  } | null
  mints?: Array<{
    __typename?: 'AppMint'
    id: string
    createdAt: any
    updatedAt: any
    order?: number | null
    mint?: {
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      airdropAmount?: number | null
      airdropMax?: number | null
      airdropPublicKey?: string | null
      coinGeckoId?: string | null
      decimals?: number | null
      default?: boolean | null
      enabled?: boolean | null
      logoUrl?: string | null
      name?: string | null
      order?: number | null
      symbol?: string | null
      type?: MintType | null
    } | null
    wallet?: {
      __typename?: 'Wallet'
      id: string
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
      type?: WalletType | null
    } | null
  }> | null
}

export type AppMintDetailsFragment = {
  __typename?: 'AppMint'
  id: string
  createdAt: any
  updatedAt: any
  order?: number | null
  mint?: {
    __typename?: 'Mint'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    address?: string | null
    airdropAmount?: number | null
    airdropMax?: number | null
    airdropPublicKey?: string | null
    coinGeckoId?: string | null
    decimals?: number | null
    default?: boolean | null
    enabled?: boolean | null
    logoUrl?: string | null
    name?: string | null
    order?: number | null
    symbol?: string | null
    type?: MintType | null
  } | null
  wallet?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
  } | null
}

export type AppTransactionDetailsFragment = {
  __typename?: 'AppTransaction'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  amount?: number | null
  destination?: string | null
  explorerUrl?: string | null
  feePayer?: string | null
  mint?: string | null
  processingDuration?: number | null
  referenceId?: string | null
  referenceType?: string | null
  signature?: string | null
  solanaCommittedDuration?: number | null
  solanaFinalized?: any | null
  solanaFinalizedDuration?: number | null
  solanaCommitted?: any | null
  solanaStart?: any | null
  solanaTransaction?: any | null
  source?: string | null
  status: AppTransactionStatus
  totalDuration?: number | null
  webhookEventDuration?: number | null
  webhookEventEnd?: any | null
  webhookEventStart?: any | null
  webhookVerifyDuration?: number | null
  webhookVerifyEnd?: any | null
  webhookVerifyStart?: any | null
  errors?: Array<{
    __typename?: 'AppTransactionError'
    id?: string | null
    message?: string | null
    type: AppTransactionErrorType
    instruction?: number | null
  }> | null
  webhookEventIncoming?: {
    __typename?: 'AppWebhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: AppWebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: AppWebhookType
  } | null
  webhookEventOutgoing?: {
    __typename?: 'AppWebhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: AppWebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: AppWebhookType
  } | null
  webhookVerifyIncoming?: {
    __typename?: 'AppWebhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: AppWebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: AppWebhookType
  } | null
  webhookVerifyOutgoing?: {
    __typename?: 'AppWebhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: AppWebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: AppWebhookType
  } | null
}

export type AppTransactionErrorDetailsFragment = {
  __typename?: 'AppTransactionError'
  id?: string | null
  message?: string | null
  type: AppTransactionErrorType
  instruction?: number | null
}

export type AppUserDetailsFragment = {
  __typename?: 'AppUser'
  id: string
  createdAt: any
  updatedAt: any
  role: AppUserRole
  app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
  user?: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  } | null
}

export type AppWebhookDetailsFragment = {
  __typename?: 'AppWebhook'
  id: string
  createdAt: any
  updatedAt: any
  direction: AppWebhookDirection
  headers?: any | null
  payload?: any | null
  responseError?: string | null
  responsePayload?: any | null
  responseStatus?: number | null
  type: AppWebhookType
}

export type UserUpdateAppMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUpdateInput
}>

export type UserUpdateAppMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      wallets?: Array<{
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      }> | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type UserUpdateAppEnvMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  input: AppEnvUpdateInput
}>

export type UserUpdateAppEnvMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    wallets?: Array<{
      __typename?: 'Wallet'
      id: string
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
      type?: WalletType | null
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserAppUserAddMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUserAddInput
}>

export type UserAppUserAddMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type UserAppUserRemoveMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUserRemoveInput
}>

export type UserAppUserRemoveMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type UserAppUserUpdateRoleMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUserUpdateRoleInput
}>

export type UserAppUserUpdateRoleMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type UserAppEnvMintDisableMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  mintId: Scalars['String']
}>

export type UserAppEnvMintDisableMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserAppEnvMintEnableMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  mintId: Scalars['String']
}>

export type UserAppEnvMintEnableMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserAppEnvMintSetWalletMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  mintId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserAppEnvMintSetWalletMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserAppEnvWalletAddMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserAppEnvWalletAddMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    wallets?: Array<{
      __typename?: 'Wallet'
      id: string
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
      type?: WalletType | null
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserAppEnvWalletRemoveMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserAppEnvWalletRemoveMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    wallets?: Array<{
      __typename?: 'Wallet'
      id: string
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
      type?: WalletType | null
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserAppTransactionQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  appTransactionId: Scalars['String']
}>

export type UserAppTransactionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppTransaction'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: number | null
    destination?: string | null
    explorerUrl?: string | null
    feePayer?: string | null
    mint?: string | null
    processingDuration?: number | null
    referenceId?: string | null
    referenceType?: string | null
    signature?: string | null
    solanaCommittedDuration?: number | null
    solanaFinalized?: any | null
    solanaFinalizedDuration?: number | null
    solanaCommitted?: any | null
    solanaStart?: any | null
    solanaTransaction?: any | null
    source?: string | null
    status: AppTransactionStatus
    totalDuration?: number | null
    webhookEventDuration?: number | null
    webhookEventEnd?: any | null
    webhookEventStart?: any | null
    webhookVerifyDuration?: number | null
    webhookVerifyEnd?: any | null
    webhookVerifyStart?: any | null
    errors?: Array<{
      __typename?: 'AppTransactionError'
      id?: string | null
      message?: string | null
      type: AppTransactionErrorType
      instruction?: number | null
    }> | null
    webhookEventIncoming?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
    webhookEventOutgoing?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
    webhookVerifyIncoming?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
    webhookVerifyOutgoing?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
  } | null
}

export type UserAppTransactionsQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  input?: InputMaybe<AppTransactionListInput>
}>

export type UserAppTransactionsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'AppTransaction'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: number | null
    destination?: string | null
    explorerUrl?: string | null
    feePayer?: string | null
    mint?: string | null
    processingDuration?: number | null
    referenceId?: string | null
    referenceType?: string | null
    signature?: string | null
    solanaCommittedDuration?: number | null
    solanaFinalized?: any | null
    solanaFinalizedDuration?: number | null
    solanaCommitted?: any | null
    solanaStart?: any | null
    solanaTransaction?: any | null
    source?: string | null
    status: AppTransactionStatus
    totalDuration?: number | null
    webhookEventDuration?: number | null
    webhookEventEnd?: any | null
    webhookEventStart?: any | null
    webhookVerifyDuration?: number | null
    webhookVerifyEnd?: any | null
    webhookVerifyStart?: any | null
    errors?: Array<{
      __typename?: 'AppTransactionError'
      id?: string | null
      message?: string | null
      type: AppTransactionErrorType
      instruction?: number | null
    }> | null
    webhookEventIncoming?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
    webhookEventOutgoing?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
    webhookVerifyIncoming?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
    webhookVerifyOutgoing?: {
      __typename?: 'AppWebhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: AppWebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: AppWebhookType
    } | null
  }> | null
}

export type UserAppsQueryVariables = Exact<{ [key: string]: never }>

export type UserAppsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
  }> | null
}

export type UserAppQueryVariables = Exact<{
  appId: Scalars['String']
}>

export type UserAppQuery = {
  __typename?: 'Query'
  role?: AppUserRole | null
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      wallets?: Array<{
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      }> | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
  } | null
}

export type UserAppEnvQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
}>

export type UserAppEnvQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    key?: string | null
    name?: string | null
    webhookAcceptIncoming?: boolean | null
    webhookEventEnabled?: boolean | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyEnabled?: boolean | null
    webhookVerifyUrl?: string | null
    wallets?: Array<{
      __typename?: 'Wallet'
      id: string
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
      type?: WalletType | null
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      enableStats?: boolean | null
      endpoint?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      }> | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type AuthTokenDetailsFragment = {
  __typename?: 'AuthToken'
  token: string
  user: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  }
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'AuthToken'
    token: string
    user: {
      __typename?: 'User'
      id: string
      createdAt: any
      updatedAt: any
      avatarUrl?: string | null
      email?: string | null
      name?: string | null
      username: string
      role?: UserRole | null
    }
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  } | null
}

export type ClusterDetailsFragment = {
  __typename?: 'Cluster'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  enableStats?: boolean | null
  endpoint?: string | null
  explorer?: string | null
  name?: string | null
  status?: ClusterStatus | null
  type?: ClusterType | null
}

export type ClusterStatDetailsFragment = {
  __typename?: 'ClusterStat'
  id: string
  createdAt: any
  updatedAt: any
  numSlots?: number | null
  numTransactions: number
  samplePeriodSecs: number
  slot: number
}

export type ClusterTokenDetailsFragment = {
  __typename?: 'ClusterToken'
  address?: string | null
  name?: string | null
  decimals?: number | null
  symbol?: string | null
  logoURI?: string | null
  tags?: Array<string> | null
  extensions?: {
    __typename?: 'ClusterTokenExtensions'
    address?: string | null
    assetContract?: string | null
    bridgeContract?: string | null
    coinGeckoId?: string | null
    description?: string | null
    discord?: string | null
    explorer?: string | null
    github?: string | null
    imageUrl?: string | null
    medium?: string | null
    serumV3Usdc?: string | null
    serumV3Usdt?: string | null
    tgann?: string | null
    tggroup?: string | null
    twitter?: string | null
    website?: string | null
  } | null
}

export type ClusterTokenExtensionsDetailsFragment = {
  __typename?: 'ClusterTokenExtensions'
  address?: string | null
  assetContract?: string | null
  bridgeContract?: string | null
  coinGeckoId?: string | null
  description?: string | null
  discord?: string | null
  explorer?: string | null
  github?: string | null
  imageUrl?: string | null
  medium?: string | null
  serumV3Usdc?: string | null
  serumV3Usdt?: string | null
  tgann?: string | null
  tggroup?: string | null
  twitter?: string | null
  website?: string | null
}

export type MintDetailsFragment = {
  __typename?: 'Mint'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  address?: string | null
  airdropAmount?: number | null
  airdropMax?: number | null
  airdropPublicKey?: string | null
  coinGeckoId?: string | null
  decimals?: number | null
  default?: boolean | null
  enabled?: boolean | null
  logoUrl?: string | null
  name?: string | null
  order?: number | null
  symbol?: string | null
  type?: MintType | null
}

export type AdminAddClusterMintMutationVariables = Exact<{
  input: MintAddInput
}>

export type AdminAddClusterMintMutation = {
  __typename?: 'Mutation'
  adminAddClusterMint?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      airdropAmount?: number | null
      airdropMax?: number | null
      airdropPublicKey?: string | null
      coinGeckoId?: string | null
      decimals?: number | null
      default?: boolean | null
      enabled?: boolean | null
      logoUrl?: string | null
      name?: string | null
      order?: number | null
      symbol?: string | null
      type?: MintType | null
    }> | null
  } | null
}

export type AdminCreateClusterMutationVariables = Exact<{
  input: ClusterCreateInput
}>

export type AdminCreateClusterMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type AdminDeleteClusterMutationVariables = Exact<{
  clusterId: Scalars['String']
}>

export type AdminDeleteClusterMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type AdminUpdateClusterMutationVariables = Exact<{
  clusterId: Scalars['String']
  input: ClusterUpdateInput
}>

export type AdminUpdateClusterMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type AdminClusterQueryVariables = Exact<{
  clusterId: Scalars['String']
}>

export type AdminClusterQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      airdropAmount?: number | null
      airdropMax?: number | null
      airdropPublicKey?: string | null
      coinGeckoId?: string | null
      decimals?: number | null
      default?: boolean | null
      enabled?: boolean | null
      logoUrl?: string | null
      name?: string | null
      order?: number | null
      symbol?: string | null
      type?: MintType | null
    }> | null
  } | null
}

export type AdminClusterTokensQueryVariables = Exact<{
  input: ClusterTokenInput
}>

export type AdminClusterTokensQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'ClusterToken'
    address?: string | null
    name?: string | null
    decimals?: number | null
    symbol?: string | null
    logoURI?: string | null
    tags?: Array<string> | null
    extensions?: {
      __typename?: 'ClusterTokenExtensions'
      address?: string | null
      assetContract?: string | null
      bridgeContract?: string | null
      coinGeckoId?: string | null
      description?: string | null
      discord?: string | null
      explorer?: string | null
      github?: string | null
      imageUrl?: string | null
      medium?: string | null
      serumV3Usdc?: string | null
      serumV3Usdt?: string | null
      tgann?: string | null
      tggroup?: string | null
      twitter?: string | null
      website?: string | null
    } | null
  }> | null
}

export type AdminClustersQueryVariables = Exact<{ [key: string]: never }>

export type AdminClustersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    enableStats?: boolean | null
    endpoint?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      airdropAmount?: number | null
      airdropMax?: number | null
      airdropPublicKey?: string | null
      coinGeckoId?: string | null
      decimals?: number | null
      default?: boolean | null
      enabled?: boolean | null
      logoUrl?: string | null
      name?: string | null
      order?: number | null
      symbol?: string | null
      type?: MintType | null
    }> | null
  }> | null
}

export type ClusterStatsQueryVariables = Exact<{
  clusterId: Scalars['String']
}>

export type ClusterStatsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'ClusterStat'
    id: string
    createdAt: any
    updatedAt: any
    numSlots?: number | null
    numTransactions: number
    samplePeriodSecs: number
    slot: number
  }> | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type UserDetailsFragment = {
  __typename?: 'User'
  id: string
  createdAt: any
  updatedAt: any
  avatarUrl?: string | null
  email?: string | null
  name?: string | null
  username: string
  role?: UserRole | null
}

export type UserEmailDetailsFragment = {
  __typename?: 'UserEmail'
  id: string
  createdAt: any
  updatedAt: any
  email: string
}

export type AdminCreateUserMutationVariables = Exact<{
  input: UserCreateInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminDeleteUserMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']
  input: UserUpdateInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  } | null
}

export type AdminUserQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
    apps?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      user?: {
        __typename?: 'User'
        id: string
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
        email?: string | null
        name?: string | null
        username: string
        role?: UserRole | null
      } | null
    }> | null
    emails?: Array<{ __typename?: 'UserEmail'; id: string; createdAt: any; updatedAt: any; email: string }> | null
  } | null
}

export type AdminUsersQueryVariables = Exact<{ [key: string]: never }>

export type AdminUsersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'User'
    id: string
    createdAt: any
    updatedAt: any
    avatarUrl?: string | null
    email?: string | null
    name?: string | null
    username: string
    role?: UserRole | null
  }> | null
}

export type WalletDetailsFragment = {
  __typename?: 'Wallet'
  id: string
  createdAt?: any | null
  updatedAt?: any | null
  publicKey?: string | null
  type?: WalletType | null
}

export type WalletAirdropResponseDetailsFragment = { __typename?: 'WalletAirdropResponse'; signature?: string | null }

export type WalletBalanceDetailsFragment = {
  __typename?: 'WalletBalance'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  balance?: any | null
  change?: any | null
}

export type AdminDeleteWalletMutationVariables = Exact<{
  walletId: Scalars['String']
}>

export type AdminDeleteWalletMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
  } | null
}

export type AdminWalletQueryVariables = Exact<{
  walletId: Scalars['String']
}>

export type AdminWalletQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
    appEnvs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
    owner?: {
      __typename?: 'User'
      id: string
      createdAt: any
      updatedAt: any
      avatarUrl?: string | null
      email?: string | null
      name?: string | null
      username: string
      role?: UserRole | null
    } | null
  } | null
}

export type AdminWalletBalancesQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type AdminWalletBalancesQuery = {
  __typename?: 'Query'
  balances?: Array<{
    __typename?: 'WalletBalance'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    balance?: any | null
    change?: any | null
  }> | null
}

export type AdminWalletsQueryVariables = Exact<{ [key: string]: never }>

export type AdminWalletsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
    balances?: Array<{
      __typename?: 'WalletBalance'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      balance?: any | null
      change?: any | null
      appEnv?: {
        __typename?: 'AppEnv'
        id: string
        createdAt: any
        updatedAt: any
        key?: string | null
        name?: string | null
        webhookAcceptIncoming?: boolean | null
        webhookEventEnabled?: boolean | null
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyEnabled?: boolean | null
        webhookVerifyUrl?: string | null
        app?: {
          __typename?: 'App'
          id: string
          createdAt: any
          updatedAt: any
          index: number
          name?: string | null
        } | null
        cluster?: {
          __typename?: 'Cluster'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          enableStats?: boolean | null
          endpoint?: string | null
          explorer?: string | null
          name?: string | null
          status?: ClusterStatus | null
          type?: ClusterType | null
          mints?: Array<{
            __typename?: 'Mint'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            address?: string | null
            airdropAmount?: number | null
            airdropMax?: number | null
            airdropPublicKey?: string | null
            coinGeckoId?: string | null
            decimals?: number | null
            default?: boolean | null
            enabled?: boolean | null
            logoUrl?: string | null
            name?: string | null
            order?: number | null
            symbol?: string | null
            type?: MintType | null
          }> | null
        } | null
        mints?: Array<{
          __typename?: 'AppMint'
          id: string
          createdAt: any
          updatedAt: any
          order?: number | null
          mint?: {
            __typename?: 'Mint'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            address?: string | null
            airdropAmount?: number | null
            airdropMax?: number | null
            airdropPublicKey?: string | null
            coinGeckoId?: string | null
            decimals?: number | null
            default?: boolean | null
            enabled?: boolean | null
            logoUrl?: string | null
            name?: string | null
            order?: number | null
            symbol?: string | null
            type?: MintType | null
          } | null
          wallet?: {
            __typename?: 'Wallet'
            id: string
            createdAt?: any | null
            updatedAt?: any | null
            publicKey?: string | null
            type?: WalletType | null
          } | null
        }> | null
      } | null
    }> | null
    appEnvs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
    owner?: {
      __typename?: 'User'
      id: string
      createdAt: any
      updatedAt: any
      avatarUrl?: string | null
      email?: string | null
      name?: string | null
      username: string
      role?: UserRole | null
    } | null
  }> | null
}

export type UserGenerateWalletMutationVariables = Exact<{
  appEnvId: Scalars['String']
}>

export type UserGenerateWalletMutation = {
  __typename?: 'Mutation'
  generated?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
    appEnvs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      key?: string | null
      name?: string | null
      webhookAcceptIncoming?: boolean | null
      webhookEventEnabled?: boolean | null
      webhookEventUrl?: string | null
      webhookSecret?: string | null
      webhookVerifyEnabled?: boolean | null
      webhookVerifyUrl?: string | null
      app?: {
        __typename?: 'App'
        id: string
        createdAt: any
        updatedAt: any
        index: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        enableStats?: boolean | null
        endpoint?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        }> | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          airdropAmount?: number | null
          airdropMax?: number | null
          airdropPublicKey?: string | null
          coinGeckoId?: string | null
          decimals?: number | null
          default?: boolean | null
          enabled?: boolean | null
          logoUrl?: string | null
          name?: string | null
          order?: number | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
          type?: WalletType | null
        } | null
      }> | null
    }> | null
  } | null
}

export type UserImportWalletMutationVariables = Exact<{
  appEnvId: Scalars['String']
  secretKey: Scalars['String']
}>

export type UserImportWalletMutation = {
  __typename?: 'Mutation'
  generated?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
  } | null
}

export type UserDeleteWalletMutationVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserDeleteWalletMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
  } | null
}

export type UserWalletQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserWalletQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
    appMints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  } | null
}

export type UserWalletAirdropQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
  amount: Scalars['Float']
}>

export type UserWalletAirdropQuery = {
  __typename?: 'Query'
  response?: { __typename?: 'WalletAirdropResponse'; signature?: string | null } | null
}

export type UserWalletBalanceQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserWalletBalanceQuery = {
  __typename?: 'Query'
  balance?: {
    __typename?: 'WalletBalance'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    balance?: any | null
    change?: any | null
  } | null
}

export type UserWalletBalancesQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type UserWalletBalancesQuery = {
  __typename?: 'Query'
  balances?: Array<{
    __typename?: 'WalletBalance'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    balance?: any | null
    change?: any | null
  }> | null
}

export type UserWalletsQueryVariables = Exact<{
  appEnvId: Scalars['String']
}>

export type UserWalletsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
    type?: WalletType | null
    appMints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        airdropAmount?: number | null
        airdropMax?: number | null
        airdropPublicKey?: string | null
        coinGeckoId?: string | null
        decimals?: number | null
        default?: boolean | null
        enabled?: boolean | null
        logoUrl?: string | null
        name?: string | null
        order?: number | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
        type?: WalletType | null
      } | null
    }> | null
  }> | null
}

export const ClusterDetailsFragmentDoc = gql`
  fragment ClusterDetails on Cluster {
    id
    createdAt
    updatedAt
    enableStats
    endpoint
    explorer
    name
    status
    type
  }
`
export const MintDetailsFragmentDoc = gql`
  fragment MintDetails on Mint {
    id
    createdAt
    updatedAt
    address
    airdropAmount
    airdropMax
    airdropPublicKey
    coinGeckoId
    decimals
    default
    enabled
    logoUrl
    name
    order
    symbol
    type
  }
`
export const WalletDetailsFragmentDoc = gql`
  fragment WalletDetails on Wallet {
    id
    createdAt
    updatedAt
    publicKey
    type
  }
`
export const AppMintDetailsFragmentDoc = gql`
  fragment AppMintDetails on AppMint {
    id
    createdAt
    updatedAt
    order
    mint {
      ...MintDetails
    }
    wallet {
      ...WalletDetails
    }
  }
  ${MintDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`
export const AppEnvDetailsFragmentDoc = gql`
  fragment AppEnvDetails on AppEnv {
    id
    createdAt
    updatedAt
    key
    app {
      id
      createdAt
      updatedAt
      index
      name
    }
    cluster {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
    mints {
      ...AppMintDetails
    }
    name
    webhookAcceptIncoming
    webhookEventEnabled
    webhookEventUrl
    webhookSecret
    webhookVerifyEnabled
    webhookVerifyUrl
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
  ${AppMintDetailsFragmentDoc}
`
export const AppTransactionErrorDetailsFragmentDoc = gql`
  fragment AppTransactionErrorDetails on AppTransactionError {
    id
    message
    type
    instruction
  }
`
export const AppWebhookDetailsFragmentDoc = gql`
  fragment AppWebhookDetails on AppWebhook {
    id
    createdAt
    updatedAt
    direction
    headers
    payload
    responseError
    responsePayload
    responseStatus
    type
  }
`
export const AppTransactionDetailsFragmentDoc = gql`
  fragment AppTransactionDetails on AppTransaction {
    id
    createdAt
    updatedAt
    amount
    destination
    errors {
      ...AppTransactionErrorDetails
    }
    explorerUrl
    feePayer
    mint
    processingDuration
    referenceId
    referenceType
    signature
    solanaCommittedDuration
    solanaFinalized
    solanaFinalizedDuration
    solanaCommitted
    solanaStart
    solanaTransaction
    source
    status
    totalDuration
    webhookEventDuration
    webhookEventIncoming {
      ...AppWebhookDetails
    }
    webhookEventOutgoing {
      ...AppWebhookDetails
    }
    webhookEventEnd
    webhookEventStart
    webhookVerifyDuration
    webhookVerifyEnd
    webhookVerifyIncoming {
      ...AppWebhookDetails
    }
    webhookVerifyOutgoing {
      ...AppWebhookDetails
    }
    webhookVerifyStart
  }
  ${AppTransactionErrorDetailsFragmentDoc}
  ${AppWebhookDetailsFragmentDoc}
`
export const AppDetailsFragmentDoc = gql`
  fragment AppDetails on App {
    id
    createdAt
    updatedAt
    index
    name
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    createdAt
    updatedAt
    avatarUrl
    email
    name
    username
    role
  }
`
export const AppUserDetailsFragmentDoc = gql`
  fragment AppUserDetails on AppUser {
    id
    createdAt
    updatedAt
    role
    app {
      ...AppDetails
    }
    user {
      ...UserDetails
    }
  }
  ${AppDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AuthTokenDetailsFragmentDoc = gql`
  fragment AuthTokenDetails on AuthToken {
    token
    user {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const ClusterStatDetailsFragmentDoc = gql`
  fragment ClusterStatDetails on ClusterStat {
    id
    createdAt
    updatedAt
    numSlots
    numTransactions
    samplePeriodSecs
    slot
  }
`
export const ClusterTokenExtensionsDetailsFragmentDoc = gql`
  fragment ClusterTokenExtensionsDetails on ClusterTokenExtensions {
    address
    assetContract
    bridgeContract
    coinGeckoId
    description
    discord
    explorer
    github
    imageUrl
    medium
    serumV3Usdc
    serumV3Usdt
    tgann
    tggroup
    twitter
    website
  }
`
export const ClusterTokenDetailsFragmentDoc = gql`
  fragment ClusterTokenDetails on ClusterToken {
    address
    name
    decimals
    symbol
    logoURI
    tags
    extensions {
      ...ClusterTokenExtensionsDetails
    }
  }
  ${ClusterTokenExtensionsDetailsFragmentDoc}
`
export const UserEmailDetailsFragmentDoc = gql`
  fragment UserEmailDetails on UserEmail {
    id
    createdAt
    updatedAt
    email
  }
`
export const WalletAirdropResponseDetailsFragmentDoc = gql`
  fragment WalletAirdropResponseDetails on WalletAirdropResponse {
    signature
  }
`
export const WalletBalanceDetailsFragmentDoc = gql`
  fragment WalletBalanceDetails on WalletBalance {
    id
    createdAt
    updatedAt
    balance
    change
  }
`
export const AdminCreateAppDocument = gql`
  mutation AdminCreateApp($input: AppCreateInput!) {
    created: adminCreateApp(input: $input) {
      ...AppDetails
      envs {
        ...AppEnvDetails
        wallets {
          ...WalletDetails
        }
      }
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useAdminCreateAppMutation() {
  return Urql.useMutation<AdminCreateAppMutation, AdminCreateAppMutationVariables>(AdminCreateAppDocument)
}
export const AdminDeleteAppDocument = gql`
  mutation AdminDeleteApp($appId: String!) {
    deleted: adminDeleteApp(appId: $appId) {
      ...AppDetails
    }
  }
  ${AppDetailsFragmentDoc}
`

export function useAdminDeleteAppMutation() {
  return Urql.useMutation<AdminDeleteAppMutation, AdminDeleteAppMutationVariables>(AdminDeleteAppDocument)
}
export const AdminAppsDocument = gql`
  query AdminApps {
    items: adminApps {
      ...AppDetails
      envs {
        ...AppEnvDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
`

export function useAdminAppsQuery(options?: Omit<Urql.UseQueryArgs<AdminAppsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminAppsQuery>({ query: AdminAppsDocument, ...options })
}
export const AdminAppDocument = gql`
  query AdminApp($appId: String!) {
    item: adminApp(appId: $appId) {
      ...AppDetails
      envs {
        ...AppEnvDetails
        wallets {
          ...WalletDetails
        }
      }
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useAdminAppQuery(options: Omit<Urql.UseQueryArgs<AdminAppQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminAppQuery>({ query: AdminAppDocument, ...options })
}
export const UserUpdateAppDocument = gql`
  mutation UserUpdateApp($appId: String!, $input: AppUpdateInput!) {
    updated: userUpdateApp(appId: $appId, input: $input) {
      ...AppDetails
      envs {
        ...AppEnvDetails
        wallets {
          ...WalletDetails
        }
      }
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useUserUpdateAppMutation() {
  return Urql.useMutation<UserUpdateAppMutation, UserUpdateAppMutationVariables>(UserUpdateAppDocument)
}
export const UserUpdateAppEnvDocument = gql`
  mutation UserUpdateAppEnv($appId: String!, $appEnvId: String!, $input: AppEnvUpdateInput!) {
    updated: userUpdateAppEnv(appId: $appId, appEnvId: $appEnvId, input: $input) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useUserUpdateAppEnvMutation() {
  return Urql.useMutation<UserUpdateAppEnvMutation, UserUpdateAppEnvMutationVariables>(UserUpdateAppEnvDocument)
}
export const UserAppUserAddDocument = gql`
  mutation UserAppUserAdd($appId: String!, $input: AppUserAddInput!) {
    item: userAppUserAdd(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useUserAppUserAddMutation() {
  return Urql.useMutation<UserAppUserAddMutation, UserAppUserAddMutationVariables>(UserAppUserAddDocument)
}
export const UserAppUserRemoveDocument = gql`
  mutation UserAppUserRemove($appId: String!, $input: AppUserRemoveInput!) {
    item: userAppUserRemove(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useUserAppUserRemoveMutation() {
  return Urql.useMutation<UserAppUserRemoveMutation, UserAppUserRemoveMutationVariables>(UserAppUserRemoveDocument)
}
export const UserAppUserUpdateRoleDocument = gql`
  mutation UserAppUserUpdateRole($appId: String!, $input: AppUserUpdateRoleInput!) {
    item: userAppUserUpdateRole(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useUserAppUserUpdateRoleMutation() {
  return Urql.useMutation<UserAppUserUpdateRoleMutation, UserAppUserUpdateRoleMutationVariables>(
    UserAppUserUpdateRoleDocument,
  )
}
export const UserAppEnvMintDisableDocument = gql`
  mutation UserAppEnvMintDisable($appId: String!, $appEnvId: String!, $mintId: String!) {
    item: userAppEnvMintDisable(appId: $appId, appEnvId: $appEnvId, mintId: $mintId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvMintDisableMutation() {
  return Urql.useMutation<UserAppEnvMintDisableMutation, UserAppEnvMintDisableMutationVariables>(
    UserAppEnvMintDisableDocument,
  )
}
export const UserAppEnvMintEnableDocument = gql`
  mutation UserAppEnvMintEnable($appId: String!, $appEnvId: String!, $mintId: String!) {
    item: userAppEnvMintEnable(appId: $appId, appEnvId: $appEnvId, mintId: $mintId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvMintEnableMutation() {
  return Urql.useMutation<UserAppEnvMintEnableMutation, UserAppEnvMintEnableMutationVariables>(
    UserAppEnvMintEnableDocument,
  )
}
export const UserAppEnvMintSetWalletDocument = gql`
  mutation userAppEnvMintSetWallet($appId: String!, $appEnvId: String!, $mintId: String!, $walletId: String!) {
    item: userAppEnvMintSetWallet(appId: $appId, appEnvId: $appEnvId, mintId: $mintId, walletId: $walletId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvMintSetWalletMutation() {
  return Urql.useMutation<UserAppEnvMintSetWalletMutation, UserAppEnvMintSetWalletMutationVariables>(
    UserAppEnvMintSetWalletDocument,
  )
}
export const UserAppEnvWalletAddDocument = gql`
  mutation UserAppEnvWalletAdd($appId: String!, $appEnvId: String!, $walletId: String!) {
    item: userAppEnvWalletAdd(appId: $appId, appEnvId: $appEnvId, walletId: $walletId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useUserAppEnvWalletAddMutation() {
  return Urql.useMutation<UserAppEnvWalletAddMutation, UserAppEnvWalletAddMutationVariables>(
    UserAppEnvWalletAddDocument,
  )
}
export const UserAppEnvWalletRemoveDocument = gql`
  mutation UserAppEnvWalletRemove($appId: String!, $appEnvId: String!, $walletId: String!) {
    item: userAppEnvWalletRemove(appId: $appId, appEnvId: $appEnvId, walletId: $walletId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useUserAppEnvWalletRemoveMutation() {
  return Urql.useMutation<UserAppEnvWalletRemoveMutation, UserAppEnvWalletRemoveMutationVariables>(
    UserAppEnvWalletRemoveDocument,
  )
}
export const UserAppTransactionDocument = gql`
  query UserAppTransaction($appId: String!, $appEnvId: String!, $appTransactionId: String!) {
    item: userAppTransaction(appId: $appId, appEnvId: $appEnvId, appTransactionId: $appTransactionId) {
      ...AppTransactionDetails
    }
  }
  ${AppTransactionDetailsFragmentDoc}
`

export function useUserAppTransactionQuery(
  options: Omit<Urql.UseQueryArgs<UserAppTransactionQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserAppTransactionQuery>({ query: UserAppTransactionDocument, ...options })
}
export const UserAppTransactionsDocument = gql`
  query UserAppTransactions($appId: String!, $appEnvId: String!, $input: AppTransactionListInput) {
    items: userAppTransactions(appId: $appId, appEnvId: $appEnvId, input: $input) {
      ...AppTransactionDetails
    }
  }
  ${AppTransactionDetailsFragmentDoc}
`

export function useUserAppTransactionsQuery(
  options: Omit<Urql.UseQueryArgs<UserAppTransactionsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserAppTransactionsQuery>({ query: UserAppTransactionsDocument, ...options })
}
export const UserAppsDocument = gql`
  query UserApps {
    items: userApps {
      ...AppDetails
      envs {
        ...AppEnvDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppsQuery(options?: Omit<Urql.UseQueryArgs<UserAppsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserAppsQuery>({ query: UserAppsDocument, ...options })
}
export const UserAppDocument = gql`
  query UserApp($appId: String!) {
    item: userApp(appId: $appId) {
      ...AppDetails
      envs {
        ...AppEnvDetails
        wallets {
          ...WalletDetails
        }
      }
      users {
        ...AppUserDetails
      }
    }
    role: userAppRole(appId: $appId)
  }
  ${AppDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useUserAppQuery(options: Omit<Urql.UseQueryArgs<UserAppQueryVariables>, 'query'>) {
  return Urql.useQuery<UserAppQuery>({ query: UserAppDocument, ...options })
}
export const UserAppEnvDocument = gql`
  query UserAppEnv($appId: String!, $appEnvId: String!) {
    item: userAppEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useUserAppEnvQuery(options: Omit<Urql.UseQueryArgs<UserAppEnvQueryVariables>, 'query'>) {
  return Urql.useQuery<UserAppEnvQuery>({ query: UserAppEnvDocument, ...options })
}
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...AuthTokenDetails
    }
  }
  ${AuthTokenDetailsFragmentDoc}
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}
export const AdminAddClusterMintDocument = gql`
  mutation AdminAddClusterMint($input: MintAddInput!) {
    adminAddClusterMint(input: $input) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useAdminAddClusterMintMutation() {
  return Urql.useMutation<AdminAddClusterMintMutation, AdminAddClusterMintMutationVariables>(
    AdminAddClusterMintDocument,
  )
}
export const AdminCreateClusterDocument = gql`
  mutation AdminCreateCluster($input: ClusterCreateInput!) {
    created: adminCreateCluster(input: $input) {
      ...ClusterDetails
    }
  }
  ${ClusterDetailsFragmentDoc}
`

export function useAdminCreateClusterMutation() {
  return Urql.useMutation<AdminCreateClusterMutation, AdminCreateClusterMutationVariables>(AdminCreateClusterDocument)
}
export const AdminDeleteClusterDocument = gql`
  mutation AdminDeleteCluster($clusterId: String!) {
    deleted: adminDeleteCluster(clusterId: $clusterId) {
      ...ClusterDetails
    }
  }
  ${ClusterDetailsFragmentDoc}
`

export function useAdminDeleteClusterMutation() {
  return Urql.useMutation<AdminDeleteClusterMutation, AdminDeleteClusterMutationVariables>(AdminDeleteClusterDocument)
}
export const AdminUpdateClusterDocument = gql`
  mutation AdminUpdateCluster($clusterId: String!, $input: ClusterUpdateInput!) {
    updated: adminUpdateCluster(clusterId: $clusterId, input: $input) {
      ...ClusterDetails
    }
  }
  ${ClusterDetailsFragmentDoc}
`

export function useAdminUpdateClusterMutation() {
  return Urql.useMutation<AdminUpdateClusterMutation, AdminUpdateClusterMutationVariables>(AdminUpdateClusterDocument)
}
export const AdminClusterDocument = gql`
  query AdminCluster($clusterId: String!) {
    item: adminCluster(clusterId: $clusterId) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useAdminClusterQuery(options: Omit<Urql.UseQueryArgs<AdminClusterQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminClusterQuery>({ query: AdminClusterDocument, ...options })
}
export const AdminClusterTokensDocument = gql`
  query AdminClusterTokens($input: ClusterTokenInput!) {
    items: adminClusterTokens(input: $input) {
      ...ClusterTokenDetails
    }
  }
  ${ClusterTokenDetailsFragmentDoc}
`

export function useAdminClusterTokensQuery(
  options: Omit<Urql.UseQueryArgs<AdminClusterTokensQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AdminClusterTokensQuery>({ query: AdminClusterTokensDocument, ...options })
}
export const AdminClustersDocument = gql`
  query AdminClusters {
    items: adminClusters {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useAdminClustersQuery(options?: Omit<Urql.UseQueryArgs<AdminClustersQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminClustersQuery>({ query: AdminClustersDocument, ...options })
}
export const ClusterStatsDocument = gql`
  query ClusterStats($clusterId: String!) {
    items: clusterStats(clusterId: $clusterId) {
      ...ClusterStatDetails
    }
  }
  ${ClusterStatDetailsFragmentDoc}
`

export function useClusterStatsQuery(options: Omit<Urql.UseQueryArgs<ClusterStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<ClusterStatsQuery>({ query: ClusterStatsDocument, ...options })
}
export const UptimeDocument = gql`
  query Uptime {
    uptime
  }
`

export function useUptimeQuery(options?: Omit<Urql.UseQueryArgs<UptimeQueryVariables>, 'query'>) {
  return Urql.useQuery<UptimeQuery>({ query: UptimeDocument, ...options })
}
export const AdminCreateUserDocument = gql`
  mutation AdminCreateUser($input: UserCreateInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminCreateUserMutation() {
  return Urql.useMutation<AdminCreateUserMutation, AdminCreateUserMutationVariables>(AdminCreateUserDocument)
}
export const AdminDeleteUserDocument = gql`
  mutation AdminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminDeleteUserMutation() {
  return Urql.useMutation<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>(AdminDeleteUserDocument)
}
export const AdminUpdateUserDocument = gql`
  mutation AdminUpdateUser($userId: String!, $input: UserUpdateInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminUpdateUserMutation() {
  return Urql.useMutation<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(AdminUpdateUserDocument)
}
export const AdminUserDocument = gql`
  query AdminUser($userId: String!) {
    item: adminUser(userId: $userId) {
      ...UserDetails
      apps {
        ...AppUserDetails
      }
      emails {
        ...UserEmailDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
  ${UserEmailDetailsFragmentDoc}
`

export function useAdminUserQuery(options: Omit<Urql.UseQueryArgs<AdminUserQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUserQuery>({ query: AdminUserDocument, ...options })
}
export const AdminUsersDocument = gql`
  query AdminUsers {
    items: adminUsers {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminUsersQuery(options?: Omit<Urql.UseQueryArgs<AdminUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUsersQuery>({ query: AdminUsersDocument, ...options })
}
export const AdminDeleteWalletDocument = gql`
  mutation AdminDeleteWallet($walletId: String!) {
    deleted: adminDeleteWallet(walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useAdminDeleteWalletMutation() {
  return Urql.useMutation<AdminDeleteWalletMutation, AdminDeleteWalletMutationVariables>(AdminDeleteWalletDocument)
}
export const AdminWalletDocument = gql`
  query AdminWallet($walletId: String!) {
    item: adminWallet(walletId: $walletId) {
      ...WalletDetails
      appEnvs {
        ...AppEnvDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${WalletDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useAdminWalletQuery(options: Omit<Urql.UseQueryArgs<AdminWalletQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminWalletQuery>({ query: AdminWalletDocument, ...options })
}
export const AdminWalletBalancesDocument = gql`
  query AdminWalletBalances($appEnvId: String!, $walletId: String!) {
    balances: adminWalletBalances(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetailsFragmentDoc}
`

export function useAdminWalletBalancesQuery(
  options: Omit<Urql.UseQueryArgs<AdminWalletBalancesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AdminWalletBalancesQuery>({ query: AdminWalletBalancesDocument, ...options })
}
export const AdminWalletsDocument = gql`
  query AdminWallets {
    items: adminWallets {
      ...WalletDetails
      balances {
        ...WalletBalanceDetails
        appEnv {
          ...AppEnvDetails
        }
      }
      appEnvs {
        ...AppEnvDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${WalletDetailsFragmentDoc}
  ${WalletBalanceDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useAdminWalletsQuery(options?: Omit<Urql.UseQueryArgs<AdminWalletsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminWalletsQuery>({ query: AdminWalletsDocument, ...options })
}
export const UserGenerateWalletDocument = gql`
  mutation UserGenerateWallet($appEnvId: String!) {
    generated: userGenerateWallet(appEnvId: $appEnvId) {
      ...WalletDetails
      appEnvs {
        ...AppEnvDetails
      }
    }
  }
  ${WalletDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
`

export function useUserGenerateWalletMutation() {
  return Urql.useMutation<UserGenerateWalletMutation, UserGenerateWalletMutationVariables>(UserGenerateWalletDocument)
}
export const UserImportWalletDocument = gql`
  mutation UserImportWallet($appEnvId: String!, $secretKey: String!) {
    generated: userImportWallet(appEnvId: $appEnvId, secretKey: $secretKey) {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useUserImportWalletMutation() {
  return Urql.useMutation<UserImportWalletMutation, UserImportWalletMutationVariables>(UserImportWalletDocument)
}
export const UserDeleteWalletDocument = gql`
  mutation UserDeleteWallet($appEnvId: String!, $walletId: String!) {
    deleted: userDeleteWallet(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useUserDeleteWalletMutation() {
  return Urql.useMutation<UserDeleteWalletMutation, UserDeleteWalletMutationVariables>(UserDeleteWalletDocument)
}
export const UserWalletDocument = gql`
  query UserWallet($appEnvId: String!, $walletId: String!) {
    item: userWallet(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletDetails
      appMints {
        ...AppMintDetails
      }
    }
  }
  ${WalletDetailsFragmentDoc}
  ${AppMintDetailsFragmentDoc}
`

export function useUserWalletQuery(options: Omit<Urql.UseQueryArgs<UserWalletQueryVariables>, 'query'>) {
  return Urql.useQuery<UserWalletQuery>({ query: UserWalletDocument, ...options })
}
export const UserWalletAirdropDocument = gql`
  query UserWalletAirdrop($appEnvId: String!, $walletId: String!, $amount: Float!) {
    response: userWalletAirdrop(appEnvId: $appEnvId, walletId: $walletId, amount: $amount) {
      ...WalletAirdropResponseDetails
    }
  }
  ${WalletAirdropResponseDetailsFragmentDoc}
`

export function useUserWalletAirdropQuery(options: Omit<Urql.UseQueryArgs<UserWalletAirdropQueryVariables>, 'query'>) {
  return Urql.useQuery<UserWalletAirdropQuery>({ query: UserWalletAirdropDocument, ...options })
}
export const UserWalletBalanceDocument = gql`
  query UserWalletBalance($appEnvId: String!, $walletId: String!) {
    balance: userWalletBalance(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetailsFragmentDoc}
`

export function useUserWalletBalanceQuery(options: Omit<Urql.UseQueryArgs<UserWalletBalanceQueryVariables>, 'query'>) {
  return Urql.useQuery<UserWalletBalanceQuery>({ query: UserWalletBalanceDocument, ...options })
}
export const UserWalletBalancesDocument = gql`
  query UserWalletBalances($appEnvId: String!, $walletId: String!) {
    balances: userWalletBalances(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetailsFragmentDoc}
`

export function useUserWalletBalancesQuery(
  options: Omit<Urql.UseQueryArgs<UserWalletBalancesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserWalletBalancesQuery>({ query: UserWalletBalancesDocument, ...options })
}
export const UserWalletsDocument = gql`
  query UserWallets($appEnvId: String!) {
    items: userWallets(appEnvId: $appEnvId) {
      ...WalletDetails
      appMints {
        ...AppMintDetails
      }
    }
  }
  ${WalletDetailsFragmentDoc}
  ${AppMintDetailsFragmentDoc}
`

export function useUserWalletsQuery(options: Omit<Urql.UseQueryArgs<UserWalletsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserWalletsQuery>({ query: UserWalletsDocument, ...options })
}
