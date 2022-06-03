/* eslint-disable */
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
  updatedAt: Scalars['DateTime']
  wallet?: Maybe<Wallet>
}

export type AppTransaction = {
  __typename?: 'AppTransaction'
  amount?: Maybe<Scalars['Int']>
  createdAt?: Maybe<Scalars['DateTime']>
  destination?: Maybe<Scalars['String']>
  errors?: Maybe<Array<AppTransactionError>>
  feePayer?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  mint?: Maybe<Scalars['String']>
  processingDuration?: Maybe<Scalars['Int']>
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
  webhookEventStart?: Maybe<Scalars['DateTime']>
  webhookVerifyDuration?: Maybe<Scalars['Int']>
  webhookVerifyEnd?: Maybe<Scalars['DateTime']>
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
  endpoint?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  mints?: Maybe<Array<Mint>>
  name?: Maybe<Scalars['String']>
  status?: Maybe<ClusterStatus>
  type?: Maybe<ClusterType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type ClusterCreateInput = {
  endpoint: Scalars['String']
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
  coingeckoId?: Maybe<Scalars['String']>
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
  endpoint?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  status?: InputMaybe<ClusterStatus>
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mint = {
  __typename?: 'Mint'
  address?: Maybe<Scalars['String']>
  coingeckoId?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  decimals?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  logoUrl?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
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
  addClusterMint?: Maybe<Cluster>
  appEnvWalletAdd?: Maybe<AppEnv>
  appEnvWalletRemove?: Maybe<AppEnv>
  appUserAdd?: Maybe<App>
  appUserRemove?: Maybe<App>
  appUserUpdateRole?: Maybe<App>
  createApp?: Maybe<App>
  createCluster?: Maybe<Cluster>
  createUser?: Maybe<User>
  deleteApp?: Maybe<App>
  deleteCluster?: Maybe<Cluster>
  deleteUser?: Maybe<User>
  deleteWallet?: Maybe<Wallet>
  generateWallet?: Maybe<Wallet>
  login?: Maybe<AuthToken>
  logout?: Maybe<Scalars['Boolean']>
  updateApp?: Maybe<App>
  updateAppEnv?: Maybe<AppEnv>
  updateCluster?: Maybe<Cluster>
  updateUser?: Maybe<User>
}

export type MutationAddClusterMintArgs = {
  input: MintAddInput
}

export type MutationAppEnvWalletAddArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationAppEnvWalletRemoveArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationAppUserAddArgs = {
  appId: Scalars['String']
  input: AppUserAddInput
}

export type MutationAppUserRemoveArgs = {
  appId: Scalars['String']
  input: AppUserRemoveInput
}

export type MutationAppUserUpdateRoleArgs = {
  appId: Scalars['String']
  input: AppUserUpdateRoleInput
}

export type MutationCreateAppArgs = {
  input: AppCreateInput
}

export type MutationCreateClusterArgs = {
  input: ClusterCreateInput
}

export type MutationCreateUserArgs = {
  input: UserCreateInput
}

export type MutationDeleteAppArgs = {
  appId: Scalars['String']
}

export type MutationDeleteClusterArgs = {
  clusterId: Scalars['String']
}

export type MutationDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationDeleteWalletArgs = {
  walletId: Scalars['String']
}

export type MutationGenerateWalletArgs = {
  index: Scalars['Int']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationUpdateAppArgs = {
  appId: Scalars['String']
  input: AppUpdateInput
}

export type MutationUpdateAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  input: AppEnvUpdateInput
}

export type MutationUpdateClusterArgs = {
  clusterId: Scalars['String']
  input: ClusterUpdateInput
}

export type MutationUpdateUserArgs = {
  input: UserUpdateInput
  userId: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  app?: Maybe<App>
  appEnv?: Maybe<AppEnv>
  appTransaction?: Maybe<AppTransaction>
  appTransactions?: Maybe<Array<AppTransaction>>
  appWebhook?: Maybe<AppWebhook>
  appWebhooks?: Maybe<Array<AppWebhook>>
  apps?: Maybe<Array<App>>
  cluster?: Maybe<Cluster>
  clusterStats?: Maybe<Array<ClusterStat>>
  clusterTokens?: Maybe<Array<ClusterToken>>
  clusters?: Maybe<Array<Cluster>>
  me?: Maybe<User>
  uptime: Scalars['Float']
  user?: Maybe<User>
  users?: Maybe<Array<User>>
  wallet?: Maybe<Wallet>
  walletAirdrop?: Maybe<WalletAirdropResponse>
  walletBalance?: Maybe<WalletBalance>
  walletBalances?: Maybe<Array<WalletBalance>>
  wallets?: Maybe<Array<Wallet>>
}

export type QueryAppArgs = {
  appId: Scalars['String']
}

export type QueryAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
}

export type QueryAppTransactionArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  appTransactionId: Scalars['String']
}

export type QueryAppTransactionsArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
}

export type QueryAppWebhookArgs = {
  appId: Scalars['String']
  appWebhookId: Scalars['String']
}

export type QueryAppWebhooksArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
}

export type QueryClusterArgs = {
  clusterId: Scalars['String']
}

export type QueryClusterStatsArgs = {
  clusterId: Scalars['String']
}

export type QueryClusterTokensArgs = {
  input: ClusterTokenInput
}

export type QueryUserArgs = {
  userId: Scalars['String']
}

export type QueryWalletArgs = {
  walletId: Scalars['String']
}

export type QueryWalletAirdropArgs = {
  amount: Scalars['Float']
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryWalletBalanceArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}

export type QueryWalletBalancesArgs = {
  appEnvId: Scalars['String']
  walletId: Scalars['String']
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
  balances?: Maybe<Array<WalletBalance>>
  createdAt?: Maybe<Scalars['DateTime']>
  id: Scalars['String']
  publicKey?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type WalletAirdropResponse = {
  __typename?: 'WalletAirdropResponse'
  signature?: Maybe<Scalars['String']>
}

export type WalletBalance = {
  __typename?: 'WalletBalance'
  balance?: Maybe<Scalars['BigInt']>
  change?: Maybe<Scalars['BigInt']>
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export const ClusterDetails = gql`
  fragment ClusterDetails on Cluster {
    id
    createdAt
    updatedAt
    endpoint
    name
    status
    type
  }
`
export const MintDetails = gql`
  fragment MintDetails on Mint {
    id
    createdAt
    updatedAt
    address
    coingeckoId
    decimals
    logoUrl
    name
    symbol
    type
  }
`
export const WalletDetails = gql`
  fragment WalletDetails on Wallet {
    id
    createdAt
    updatedAt
    publicKey
  }
`
export const AppMintDetails = gql`
  fragment AppMintDetails on AppMint {
    id
    createdAt
    updatedAt
    mint {
      ...MintDetails
    }
    wallet {
      ...WalletDetails
    }
  }
  ${MintDetails}
  ${WalletDetails}
`
export const AppEnvDetails = gql`
  fragment AppEnvDetails on AppEnv {
    id
    createdAt
    updatedAt
    app {
      id
      createdAt
      updatedAt
      index
      name
    }
    cluster {
      ...ClusterDetails
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
  ${ClusterDetails}
  ${AppMintDetails}
`
export const AppTransactionErrorDetails = gql`
  fragment AppTransactionErrorDetails on AppTransactionError {
    id
    message
    type
    instruction
  }
`
export const AppTransactionDetails = gql`
  fragment AppTransactionDetails on AppTransaction {
    id
    createdAt
    updatedAt
    amount
    destination
    errors {
      ...AppTransactionErrorDetails
    }
    feePayer
    mint
    processingDuration
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
    webhookEventEnd
    webhookEventStart
    webhookVerifyDuration
    webhookVerifyEnd
    webhookVerifyStart
  }
  ${AppTransactionErrorDetails}
`
export const AppDetails = gql`
  fragment AppDetails on App {
    id
    createdAt
    updatedAt
    index
    name
  }
`
export const UserDetails = gql`
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
export const AppUserDetails = gql`
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
  ${AppDetails}
  ${UserDetails}
`
export const AppWebhookDetails = gql`
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
export const AuthTokenDetails = gql`
  fragment AuthTokenDetails on AuthToken {
    token
    user {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const ClusterStatDetails = gql`
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
export const ClusterTokenExtensionsDetails = gql`
  fragment ClusterTokenExtensionsDetails on ClusterTokenExtensions {
    address
    assetContract
    bridgeContract
    coingeckoId
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
export const ClusterTokenDetails = gql`
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
  ${ClusterTokenExtensionsDetails}
`
export const UserEmailDetails = gql`
  fragment UserEmailDetails on UserEmail {
    id
    createdAt
    updatedAt
    email
  }
`
export const WalletAirdropResponseDetails = gql`
  fragment WalletAirdropResponseDetails on WalletAirdropResponse {
    signature
  }
`
export const WalletBalanceDetails = gql`
  fragment WalletBalanceDetails on WalletBalance {
    id
    createdAt
    updatedAt
    balance
    change
  }
`
export const CreateApp = gql`
  mutation CreateApp($input: AppCreateInput!) {
    created: createApp(input: $input) {
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const DeleteApp = gql`
  mutation DeleteApp($appId: String!) {
    deleted: deleteApp(appId: $appId) {
      ...AppDetails
    }
  }
  ${AppDetails}
`
export const UpdateApp = gql`
  mutation UpdateApp($appId: String!, $input: AppUpdateInput!) {
    updated: updateApp(appId: $appId, input: $input) {
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const UpdateAppEnv = gql`
  mutation UpdateAppEnv($appId: String!, $appEnvId: String!, $input: AppEnvUpdateInput!) {
    updated: updateAppEnv(appId: $appId, appEnvId: $appEnvId, input: $input) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const AppUserAdd = gql`
  mutation AppUserAdd($appId: String!, $input: AppUserAddInput!) {
    item: appUserAdd(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const AppUserRemove = gql`
  mutation AppUserRemove($appId: String!, $input: AppUserRemoveInput!) {
    item: appUserRemove(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const AppUserUpdateRole = gql`
  mutation AppUserUpdateRole($appId: String!, $input: AppUserUpdateRoleInput!) {
    item: appUserUpdateRole(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const AppEnvWalletAdd = gql`
  mutation AppEnvWalletAdd($appId: String!, $appEnvId: String!, $walletId: String!) {
    item: appEnvWalletAdd(appId: $appId, appEnvId: $appEnvId, walletId: $walletId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const AppEnvWalletRemove = gql`
  mutation AppEnvWalletRemove($appId: String!, $appEnvId: String!, $walletId: String!) {
    item: appEnvWalletRemove(appId: $appId, appEnvId: $appEnvId, walletId: $walletId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const App = gql`
  query App($appId: String!) {
    item: app(appId: $appId) {
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const AppEnv = gql`
  query AppEnv($appId: String!, $appEnvId: String!) {
    item: appEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const AppTransaction = gql`
  query AppTransaction($appId: String!, $appEnvId: String!, $appTransactionId: String!) {
    item: appTransaction(appId: $appId, appEnvId: $appEnvId, appTransactionId: $appTransactionId) {
      ...AppTransactionDetails
    }
  }
  ${AppTransactionDetails}
`
export const AppTransactions = gql`
  query AppTransactions($appId: String!, $appEnvId: String!) {
    items: appTransactions(appId: $appId, appEnvId: $appEnvId) {
      ...AppTransactionDetails
    }
  }
  ${AppTransactionDetails}
`
export const AppWebhook = gql`
  query AppWebhook($appId: String!, $appWebhookId: String!) {
    item: appWebhook(appId: $appId, appWebhookId: $appWebhookId) {
      ...AppWebhookDetails
    }
  }
  ${AppWebhookDetails}
`
export const AppWebhooks = gql`
  query AppWebhooks($appId: String!, $appEnvId: String!) {
    items: appWebhooks(appId: $appId, appEnvId: $appEnvId) {
      ...AppWebhookDetails
    }
  }
  ${AppWebhookDetails}
`
export const Apps = gql`
  query Apps {
    items: apps {
      ...AppDetails
      envs {
        ...AppEnvDetails
      }
    }
  }
  ${AppDetails}
  ${AppEnvDetails}
`
export const Login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...AuthTokenDetails
    }
  }
  ${AuthTokenDetails}
`
export const Logout = gql`
  mutation Logout {
    logout
  }
`
export const Me = gql`
  query Me {
    me {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const AddClusterMint = gql`
  mutation addClusterMint($input: MintAddInput!) {
    addClusterMint(input: $input) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const CreateCluster = gql`
  mutation CreateCluster($input: ClusterCreateInput!) {
    created: createCluster(input: $input) {
      ...ClusterDetails
    }
  }
  ${ClusterDetails}
`
export const DeleteCluster = gql`
  mutation DeleteCluster($clusterId: String!) {
    deleted: deleteCluster(clusterId: $clusterId) {
      ...ClusterDetails
    }
  }
  ${ClusterDetails}
`
export const UpdateCluster = gql`
  mutation UpdateCluster($clusterId: String!, $input: ClusterUpdateInput!) {
    updated: updateCluster(clusterId: $clusterId, input: $input) {
      ...ClusterDetails
    }
  }
  ${ClusterDetails}
`
export const Cluster = gql`
  query Cluster($clusterId: String!) {
    item: cluster(clusterId: $clusterId) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const ClusterTokens = gql`
  query ClusterTokens($input: ClusterTokenInput!) {
    items: clusterTokens(input: $input) {
      ...ClusterTokenDetails
    }
  }
  ${ClusterTokenDetails}
`
export const Clusters = gql`
  query Clusters {
    items: clusters {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const ClusterStats = gql`
  query ClusterStats($clusterId: String!) {
    items: clusterStats(clusterId: $clusterId) {
      ...ClusterStatDetails
    }
  }
  ${ClusterStatDetails}
`
export const Uptime = gql`
  query Uptime {
    uptime
  }
`
export const CreateUser = gql`
  mutation CreateUser($input: UserCreateInput!) {
    created: createUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const DeleteUser = gql`
  mutation DeleteUser($userId: String!) {
    deleted: deleteUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const UpdateUser = gql`
  mutation UpdateUser($userId: String!, $input: UserUpdateInput!) {
    updated: updateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const User = gql`
  query User($userId: String!) {
    item: user(userId: $userId) {
      ...UserDetails
      apps {
        ...AppUserDetails
      }
      emails {
        ...UserEmailDetails
      }
    }
  }
  ${UserDetails}
  ${AppUserDetails}
  ${UserEmailDetails}
`
export const Users = gql`
  query Users {
    items: users {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const GenerateWallet = gql`
  mutation GenerateWallet($index: Int!) {
    generated: generateWallet(index: $index) {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
export const DeleteWallet = gql`
  mutation DeleteWallet($walletId: String!) {
    deleted: deleteWallet(walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
export const Wallet = gql`
  query Wallet($walletId: String!) {
    item: wallet(walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
export const WalletAirdrop = gql`
  query WalletAirdrop($appEnvId: String!, $walletId: String!, $amount: Float!) {
    response: walletAirdrop(appEnvId: $appEnvId, walletId: $walletId, amount: $amount) {
      ...WalletAirdropResponseDetails
    }
  }
  ${WalletAirdropResponseDetails}
`
export const WalletBalance = gql`
  query WalletBalance($appEnvId: String!, $walletId: String!) {
    balance: walletBalance(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetails}
`
export const WalletBalances = gql`
  query WalletBalances($appEnvId: String!, $walletId: String!) {
    balances: walletBalances(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetails}
`
export const Wallets = gql`
  query Wallets {
    items: wallets {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
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
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
  mints?: Array<{
    __typename?: 'AppMint'
    id: string
    createdAt: any
    updatedAt: any
    mint?: {
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      coingeckoId?: string | null
      decimals?: number | null
      logoUrl?: string | null
      name?: string | null
      symbol?: string | null
      type?: MintType | null
    } | null
    wallet?: {
      __typename?: 'Wallet'
      id: string
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
  }> | null
}

export type AppMintDetailsFragment = {
  __typename?: 'AppMint'
  id: string
  createdAt: any
  updatedAt: any
  mint?: {
    __typename?: 'Mint'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    address?: string | null
    coingeckoId?: string | null
    decimals?: number | null
    logoUrl?: string | null
    name?: string | null
    symbol?: string | null
    type?: MintType | null
  } | null
  wallet?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  } | null
}

export type AppTransactionDetailsFragment = {
  __typename?: 'AppTransaction'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  amount?: number | null
  destination?: string | null
  feePayer?: string | null
  mint?: string | null
  processingDuration?: number | null
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

export type CreateAppMutationVariables = Exact<{
  input: AppCreateInput
}>

export type CreateAppMutation = {
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
        endpoint?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          coingeckoId?: string | null
          decimals?: number | null
          logoUrl?: string | null
          name?: string | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
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

export type DeleteAppMutationVariables = Exact<{
  appId: Scalars['String']
}>

export type DeleteAppMutation = {
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

export type UpdateAppMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUpdateInput
}>

export type UpdateAppMutation = {
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
        endpoint?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          coingeckoId?: string | null
          decimals?: number | null
          logoUrl?: string | null
          name?: string | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
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

export type UpdateAppEnvMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  input: AppEnvUpdateInput
}>

export type UpdateAppEnvMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
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
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpoint?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        coingeckoId?: string | null
        decimals?: number | null
        logoUrl?: string | null
        name?: string | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
      } | null
    }> | null
  } | null
}

export type AppUserAddMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUserAddInput
}>

export type AppUserAddMutation = {
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

export type AppUserRemoveMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUserRemoveInput
}>

export type AppUserRemoveMutation = {
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

export type AppUserUpdateRoleMutationVariables = Exact<{
  appId: Scalars['String']
  input: AppUserUpdateRoleInput
}>

export type AppUserUpdateRoleMutation = {
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

export type AppEnvWalletAddMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type AppEnvWalletAddMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
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
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpoint?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        coingeckoId?: string | null
        decimals?: number | null
        logoUrl?: string | null
        name?: string | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
      } | null
    }> | null
  } | null
}

export type AppEnvWalletRemoveMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type AppEnvWalletRemoveMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
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
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpoint?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        coingeckoId?: string | null
        decimals?: number | null
        logoUrl?: string | null
        name?: string | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
      } | null
    }> | null
  } | null
}

export type AppQueryVariables = Exact<{
  appId: Scalars['String']
}>

export type AppQuery = {
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
        endpoint?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          coingeckoId?: string | null
          decimals?: number | null
          logoUrl?: string | null
          name?: string | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
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

export type AppEnvQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
}>

export type AppEnvQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
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
    }> | null
    app?: { __typename?: 'App'; id: string; createdAt: any; updatedAt: any; index: number; name?: string | null } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpoint?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
    } | null
    mints?: Array<{
      __typename?: 'AppMint'
      id: string
      createdAt: any
      updatedAt: any
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        address?: string | null
        coingeckoId?: string | null
        decimals?: number | null
        logoUrl?: string | null
        name?: string | null
        symbol?: string | null
        type?: MintType | null
      } | null
      wallet?: {
        __typename?: 'Wallet'
        id: string
        createdAt?: any | null
        updatedAt?: any | null
        publicKey?: string | null
      } | null
    }> | null
  } | null
}

export type AppTransactionQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  appTransactionId: Scalars['String']
}>

export type AppTransactionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppTransaction'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: number | null
    destination?: string | null
    feePayer?: string | null
    mint?: string | null
    processingDuration?: number | null
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
  } | null
}

export type AppTransactionsQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
}>

export type AppTransactionsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'AppTransaction'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: number | null
    destination?: string | null
    feePayer?: string | null
    mint?: string | null
    processingDuration?: number | null
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
  }> | null
}

export type AppWebhookQueryVariables = Exact<{
  appId: Scalars['String']
  appWebhookId: Scalars['String']
}>

export type AppWebhookQuery = {
  __typename?: 'Query'
  item?: {
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

export type AppWebhooksQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
}>

export type AppWebhooksQuery = {
  __typename?: 'Query'
  items?: Array<{
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
  }> | null
}

export type AppsQueryVariables = Exact<{ [key: string]: never }>

export type AppsQuery = {
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
        endpoint?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
      } | null
      mints?: Array<{
        __typename?: 'AppMint'
        id: string
        createdAt: any
        updatedAt: any
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          address?: string | null
          coingeckoId?: string | null
          decimals?: number | null
          logoUrl?: string | null
          name?: string | null
          symbol?: string | null
          type?: MintType | null
        } | null
        wallet?: {
          __typename?: 'Wallet'
          id: string
          createdAt?: any | null
          updatedAt?: any | null
          publicKey?: string | null
        } | null
      }> | null
    }> | null
  }> | null
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
  endpoint?: string | null
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
    coingeckoId?: string | null
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
  coingeckoId?: string | null
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
  coingeckoId?: string | null
  decimals?: number | null
  logoUrl?: string | null
  name?: string | null
  symbol?: string | null
  type?: MintType | null
}

export type AddClusterMintMutationVariables = Exact<{
  input: MintAddInput
}>

export type AddClusterMintMutation = {
  __typename?: 'Mutation'
  addClusterMint?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      coingeckoId?: string | null
      decimals?: number | null
      logoUrl?: string | null
      name?: string | null
      symbol?: string | null
      type?: MintType | null
    }> | null
  } | null
}

export type CreateClusterMutationVariables = Exact<{
  input: ClusterCreateInput
}>

export type CreateClusterMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type DeleteClusterMutationVariables = Exact<{
  clusterId: Scalars['String']
}>

export type DeleteClusterMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type UpdateClusterMutationVariables = Exact<{
  clusterId: Scalars['String']
  input: ClusterUpdateInput
}>

export type UpdateClusterMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type ClusterQueryVariables = Exact<{
  clusterId: Scalars['String']
}>

export type ClusterQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      coingeckoId?: string | null
      decimals?: number | null
      logoUrl?: string | null
      name?: string | null
      symbol?: string | null
      type?: MintType | null
    }> | null
  } | null
}

export type ClusterTokensQueryVariables = Exact<{
  input: ClusterTokenInput
}>

export type ClusterTokensQuery = {
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
      coingeckoId?: string | null
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

export type ClustersQueryVariables = Exact<{ [key: string]: never }>

export type ClustersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpoint?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      address?: string | null
      coingeckoId?: string | null
      decimals?: number | null
      logoUrl?: string | null
      name?: string | null
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

export type CreateUserMutationVariables = Exact<{
  input: UserCreateInput
}>

export type CreateUserMutation = {
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

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type DeleteUserMutation = {
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

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['String']
  input: UserUpdateInput
}>

export type UpdateUserMutation = {
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

export type UserQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type UserQuery = {
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

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = {
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

export type GenerateWalletMutationVariables = Exact<{
  index: Scalars['Int']
}>

export type GenerateWalletMutation = {
  __typename?: 'Mutation'
  generated?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  } | null
}

export type DeleteWalletMutationVariables = Exact<{
  walletId: Scalars['String']
}>

export type DeleteWalletMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  } | null
}

export type WalletQueryVariables = Exact<{
  walletId: Scalars['String']
}>

export type WalletQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  } | null
}

export type WalletAirdropQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
  amount: Scalars['Float']
}>

export type WalletAirdropQuery = {
  __typename?: 'Query'
  response?: { __typename?: 'WalletAirdropResponse'; signature?: string | null } | null
}

export type WalletBalanceQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type WalletBalanceQuery = {
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

export type WalletBalancesQueryVariables = Exact<{
  appEnvId: Scalars['String']
  walletId: Scalars['String']
}>

export type WalletBalancesQuery = {
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

export type WalletsQueryVariables = Exact<{ [key: string]: never }>

export type WalletsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Wallet'
    id: string
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  }> | null
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
