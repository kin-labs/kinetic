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
  publicKey?: Maybe<Scalars['String']>
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

export const ClusterDetails = gql`
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
export const MintDetails = gql`
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
    order
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
  ${ClusterDetails}
  ${MintDetails}
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
  ${AppTransactionErrorDetails}
  ${AppWebhookDetails}
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
export const AdminCreateApp = gql`
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const AdminDeleteApp = gql`
  mutation AdminDeleteApp($appId: String!) {
    deleted: adminDeleteApp(appId: $appId) {
      ...AppDetails
    }
  }
  ${AppDetails}
`
export const AdminApps = gql`
  query AdminApps {
    items: adminApps {
      ...AppDetails
      envs {
        ...AppEnvDetails
      }
    }
  }
  ${AppDetails}
  ${AppEnvDetails}
`
export const AdminApp = gql`
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const UserUpdateApp = gql`
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const UserUpdateAppEnv = gql`
  mutation UserUpdateAppEnv($appId: String!, $appEnvId: String!, $input: AppEnvUpdateInput!) {
    updated: userUpdateAppEnv(appId: $appId, appEnvId: $appEnvId, input: $input) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const UserAppUserAdd = gql`
  mutation UserAppUserAdd($appId: String!, $input: AppUserAddInput!) {
    item: userAppUserAdd(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const UserAppUserRemove = gql`
  mutation UserAppUserRemove($appId: String!, $input: AppUserRemoveInput!) {
    item: userAppUserRemove(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const UserAppUserUpdateRole = gql`
  mutation UserAppUserUpdateRole($appId: String!, $input: AppUserUpdateRoleInput!) {
    item: userAppUserUpdateRole(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const UserAppEnvMintDisable = gql`
  mutation UserAppEnvMintDisable($appId: String!, $appEnvId: String!, $mintId: String!) {
    item: userAppEnvMintDisable(appId: $appId, appEnvId: $appEnvId, mintId: $mintId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvMintEnable = gql`
  mutation UserAppEnvMintEnable($appId: String!, $appEnvId: String!, $mintId: String!) {
    item: userAppEnvMintEnable(appId: $appId, appEnvId: $appEnvId, mintId: $mintId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvMintSetWallet = gql`
  mutation userAppEnvMintSetWallet($appId: String!, $appEnvId: String!, $mintId: String!, $walletId: String!) {
    item: userAppEnvMintSetWallet(appId: $appId, appEnvId: $appEnvId, mintId: $mintId, walletId: $walletId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvWalletAdd = gql`
  mutation UserAppEnvWalletAdd($appId: String!, $appEnvId: String!, $walletId: String!) {
    item: userAppEnvWalletAdd(appId: $appId, appEnvId: $appEnvId, walletId: $walletId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const UserAppEnvWalletRemove = gql`
  mutation UserAppEnvWalletRemove($appId: String!, $appEnvId: String!, $walletId: String!) {
    item: userAppEnvWalletRemove(appId: $appId, appEnvId: $appEnvId, walletId: $walletId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const UserAppTransaction = gql`
  query UserAppTransaction($appId: String!, $appEnvId: String!, $appTransactionId: String!) {
    item: userAppTransaction(appId: $appId, appEnvId: $appEnvId, appTransactionId: $appTransactionId) {
      ...AppTransactionDetails
    }
  }
  ${AppTransactionDetails}
`
export const UserAppTransactions = gql`
  query UserAppTransactions($appId: String!, $appEnvId: String!, $input: AppTransactionListInput) {
    items: userAppTransactions(appId: $appId, appEnvId: $appEnvId, input: $input) {
      ...AppTransactionDetails
    }
  }
  ${AppTransactionDetails}
`
export const UserApps = gql`
  query UserApps {
    items: userApps {
      ...AppDetails
      envs {
        ...AppEnvDetails
      }
    }
  }
  ${AppDetails}
  ${AppEnvDetails}
`
export const UserApp = gql`
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const UserAppEnv = gql`
  query UserAppEnv($appId: String!, $appEnvId: String!) {
    item: userAppEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
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
export const AdminAddClusterMint = gql`
  mutation AdminAddClusterMint($input: MintAddInput!) {
    adminAddClusterMint(input: $input) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const AdminCreateCluster = gql`
  mutation AdminCreateCluster($input: ClusterCreateInput!) {
    created: adminCreateCluster(input: $input) {
      ...ClusterDetails
    }
  }
  ${ClusterDetails}
`
export const AdminDeleteCluster = gql`
  mutation AdminDeleteCluster($clusterId: String!) {
    deleted: adminDeleteCluster(clusterId: $clusterId) {
      ...ClusterDetails
    }
  }
  ${ClusterDetails}
`
export const AdminUpdateCluster = gql`
  mutation AdminUpdateCluster($clusterId: String!, $input: ClusterUpdateInput!) {
    updated: adminUpdateCluster(clusterId: $clusterId, input: $input) {
      ...ClusterDetails
    }
  }
  ${ClusterDetails}
`
export const AdminCluster = gql`
  query AdminCluster($clusterId: String!) {
    item: adminCluster(clusterId: $clusterId) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const AdminClusterTokens = gql`
  query AdminClusterTokens($input: ClusterTokenInput!) {
    items: adminClusterTokens(input: $input) {
      ...ClusterTokenDetails
    }
  }
  ${ClusterTokenDetails}
`
export const AdminClusters = gql`
  query AdminClusters {
    items: adminClusters {
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
export const AdminCreateUser = gql`
  mutation AdminCreateUser($input: UserCreateInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const AdminDeleteUser = gql`
  mutation AdminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const AdminUpdateUser = gql`
  mutation AdminUpdateUser($userId: String!, $input: UserUpdateInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const AdminUser = gql`
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
  ${UserDetails}
  ${AppUserDetails}
  ${UserEmailDetails}
`
export const AdminUsers = gql`
  query AdminUsers {
    items: adminUsers {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const AdminDeleteWallet = gql`
  mutation AdminDeleteWallet($walletId: String!) {
    deleted: adminDeleteWallet(walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
export const AdminWallet = gql`
  query AdminWallet($walletId: String!) {
    item: adminWallet(walletId: $walletId) {
      ...WalletDetails
      appEnvs {
        ...AppEnvDetails
      }
    }
  }
  ${WalletDetails}
  ${AppEnvDetails}
`
export const AdminWalletBalances = gql`
  query AdminWalletBalances($appEnvId: String!, $walletId: String!) {
    balances: adminWalletBalances(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetails}
`
export const AdminWallets = gql`
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
    }
  }
  ${WalletDetails}
  ${WalletBalanceDetails}
  ${AppEnvDetails}
`
export const UserGenerateWallet = gql`
  mutation UserGenerateWallet($appEnvId: String!) {
    generated: userGenerateWallet(appEnvId: $appEnvId) {
      ...WalletDetails
      appEnvs {
        ...AppEnvDetails
      }
    }
  }
  ${WalletDetails}
  ${AppEnvDetails}
`
export const UserImportWallet = gql`
  mutation UserImportWallet($appEnvId: String!, $secretKey: String!) {
    generated: userImportWallet(appEnvId: $appEnvId, secretKey: $secretKey) {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
export const UserDeleteWallet = gql`
  mutation UserDeleteWallet($appEnvId: String!, $walletId: String!) {
    deleted: userDeleteWallet(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetails}
`
export const UserWallet = gql`
  query UserWallet($appEnvId: String!, $walletId: String!) {
    item: userWallet(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletDetails
      appMints {
        ...AppMintDetails
      }
    }
  }
  ${WalletDetails}
  ${AppMintDetails}
`
export const UserWalletAirdrop = gql`
  query UserWalletAirdrop($appEnvId: String!, $walletId: String!, $amount: Float!) {
    response: userWalletAirdrop(appEnvId: $appEnvId, walletId: $walletId, amount: $amount) {
      ...WalletAirdropResponseDetails
    }
  }
  ${WalletAirdropResponseDetails}
`
export const UserWalletBalance = gql`
  query UserWalletBalance($appEnvId: String!, $walletId: String!) {
    balance: userWalletBalance(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetails}
`
export const UserWalletBalances = gql`
  query UserWalletBalances($appEnvId: String!, $walletId: String!) {
    balances: userWalletBalances(appEnvId: $appEnvId, walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetails}
`
export const UserWallets = gql`
  query UserWallets($appEnvId: String!) {
    items: userWallets(appEnvId: $appEnvId) {
      ...WalletDetails
      appMints {
        ...AppMintDetails
      }
    }
  }
  ${WalletDetails}
  ${AppMintDetails}
`
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
        } | null
      }> | null
    }> | null
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
        } | null
      }> | null
    }> | null
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
      } | null
    }> | null
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
