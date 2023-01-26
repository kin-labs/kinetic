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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type AdminAppCreateInput = {
  enableWebhooks?: InputMaybe<Scalars['Boolean']>
  index: Scalars['Int']
  logoUrl?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  skipWalletCreation?: InputMaybe<Scalars['Boolean']>
}

export type AdminAppUpdateInput = {
  index?: InputMaybe<Scalars['Int']>
  logoUrl?: InputMaybe<Scalars['String']>
  maxEnvs?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
}

export type AdminClusterCreateInput = {
  endpointPrivate: Scalars['String']
  endpointPublic: Scalars['String']
  explorer?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  type: ClusterType
}

export type AdminClusterUpdateInput = {
  endpointPrivate?: InputMaybe<Scalars['String']>
  endpointPublic?: InputMaybe<Scalars['String']>
  explorer?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  status?: InputMaybe<ClusterStatus>
}

export type AdminMintCreateInput = {
  address: Scalars['String']
  clusterId: Scalars['String']
  coinGeckoId?: InputMaybe<Scalars['String']>
  decimals: Scalars['Int']
  logoUrl?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  symbol: Scalars['String']
}

export type AdminQueueLoadInput = {
  environment: Scalars['String']
  index: Scalars['Int']
  payload: Scalars['JSON']
  type: QueueType
}

export type AdminUserCreateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  role?: InputMaybe<UserRole>
  username?: InputMaybe<Scalars['String']>
}

export type AdminUserUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
}

export type App = {
  __typename?: 'App'
  createdAt: Scalars['DateTime']
  defaultEnvUrl?: Maybe<Scalars['String']>
  envs?: Maybe<Array<AppEnv>>
  id: Scalars['String']
  index: Scalars['Int']
  logoUrl?: Maybe<Scalars['String']>
  maxEnvs: Scalars['Int']
  name?: Maybe<Scalars['String']>
  settingsUrl?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  users?: Maybe<Array<AppUser>>
}

export type AppEnv = {
  __typename?: 'AppEnv'
  app?: Maybe<App>
  cluster?: Maybe<Cluster>
  createdAt: Scalars['DateTime']
  endpoint?: Maybe<Scalars['String']>
  id: Scalars['String']
  ipsAllowed?: Maybe<Array<Scalars['String']>>
  ipsBlocked?: Maybe<Array<Scalars['String']>>
  key?: Maybe<Scalars['String']>
  mints?: Maybe<Array<AppMint>>
  name?: Maybe<Scalars['String']>
  solanaTransactionMaxRetries?: Maybe<Scalars['Int']>
  solanaTransactionSkipPreflight?: Maybe<Scalars['Boolean']>
  uasAllowed?: Maybe<Array<Scalars['String']>>
  uasBlocked?: Maybe<Array<Scalars['String']>>
  updatedAt: Scalars['DateTime']
  wallets?: Maybe<Array<Wallet>>
  webhookBalanceEnabled?: Maybe<Scalars['Boolean']>
  webhookBalanceThreshold?: Maybe<Scalars['String']>
  webhookBalanceUrl?: Maybe<Scalars['String']>
  webhookDebugging?: Maybe<Scalars['Boolean']>
  webhookEventEnabled?: Maybe<Scalars['Boolean']>
  webhookEventUrl?: Maybe<Scalars['String']>
  webhookSecret?: Maybe<Scalars['String']>
  webhookVerifyEnabled?: Maybe<Scalars['Boolean']>
  webhookVerifyUrl?: Maybe<Scalars['String']>
}

export type AppEnvStats = {
  __typename?: 'AppEnvStats'
  transactionCount?: Maybe<AppEnvTransactionCount>
}

export type AppEnvTransactionCount = {
  __typename?: 'AppEnvTransactionCount'
  Committed?: Maybe<Scalars['Int']>
  Confirmed?: Maybe<Scalars['Int']>
  Failed?: Maybe<Scalars['Int']>
  Finalized?: Maybe<Scalars['Int']>
  Processing?: Maybe<Scalars['Int']>
}

export type AppMint = {
  __typename?: 'AppMint'
  addMemo?: Maybe<Scalars['Boolean']>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  mint?: Maybe<Mint>
  order?: Maybe<Scalars['Int']>
  updatedAt: Scalars['DateTime']
  wallet?: Maybe<Wallet>
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

export enum AppUserRole {
  Member = 'Member',
  Owner = 'Owner',
}

export type AuthToken = {
  __typename?: 'AuthToken'
  token: Scalars['String']
  user: User
}

export type Cluster = {
  __typename?: 'Cluster'
  createdAt?: Maybe<Scalars['DateTime']>
  endpointPrivate?: Maybe<Scalars['String']>
  endpointPublic?: Maybe<Scalars['String']>
  envs?: Maybe<Array<AppEnv>>
  explorer?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  mints?: Maybe<Array<Mint>>
  name?: Maybe<Scalars['String']>
  status?: Maybe<ClusterStatus>
  type?: Maybe<ClusterType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export enum ClusterStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum ClusterType {
  Custom = 'Custom',
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
  SolanaTestnet = 'SolanaTestnet',
}

export type Job = {
  __typename?: 'Job'
  attemptsMade?: Maybe<Scalars['Int']>
  data?: Maybe<Scalars['JSON']>
  failedReason?: Maybe<Scalars['String']>
  finishedOn?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  opts?: Maybe<Scalars['JSON']>
  processedOn?: Maybe<Scalars['Int']>
  returnvalue?: Maybe<Scalars['JSON']>
  stacktrace?: Maybe<Array<Scalars['String']>>
  timestamp?: Maybe<Scalars['Int']>
}

export enum JobStatus {
  Active = 'active',
  Completed = 'completed',
  Delayed = 'delayed',
  Failed = 'failed',
  Paused = 'paused',
  Waiting = 'waiting',
}

export type Mint = {
  __typename?: 'Mint'
  addMemo?: Maybe<Scalars['Boolean']>
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

export enum MintType {
  SplToken = 'SplToken',
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateApp?: Maybe<App>
  adminCreateCluster?: Maybe<Cluster>
  adminCreateUser?: Maybe<User>
  adminDeleteApp?: Maybe<App>
  adminDeleteAppEnv?: Maybe<AppEnv>
  adminDeleteCluster?: Maybe<Cluster>
  adminDeleteMint?: Maybe<Mint>
  adminDeleteUser?: Maybe<User>
  adminDeleteWallet?: Maybe<Wallet>
  adminMintCreate?: Maybe<Cluster>
  adminMintImportWallet?: Maybe<Mint>
  adminQueueClean?: Maybe<Scalars['Boolean']>
  adminQueueDeleteJob?: Maybe<Scalars['Boolean']>
  adminQueueLoad?: Maybe<Queue>
  adminQueuePause?: Maybe<Scalars['Boolean']>
  adminQueueResume?: Maybe<Scalars['Boolean']>
  adminUpdateApp?: Maybe<App>
  adminUpdateCluster?: Maybe<Cluster>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<AuthToken>
  logout?: Maybe<Scalars['Boolean']>
  userAppEnvAddAllowedIp?: Maybe<AppEnv>
  userAppEnvAddAllowedUa?: Maybe<AppEnv>
  userAppEnvAddBlockedIp?: Maybe<AppEnv>
  userAppEnvAddBlockedUa?: Maybe<AppEnv>
  userAppEnvMintDisable?: Maybe<AppEnv>
  userAppEnvMintEnable?: Maybe<AppEnv>
  userAppEnvMintSetWallet?: Maybe<AppEnv>
  userAppEnvPurgeTransactions?: Maybe<AppEnv>
  userAppEnvRemoveAllowedIp?: Maybe<AppEnv>
  userAppEnvRemoveAllowedUa?: Maybe<AppEnv>
  userAppEnvRemoveBlockedIp?: Maybe<AppEnv>
  userAppEnvRemoveBlockedUa?: Maybe<AppEnv>
  userAppEnvWalletAdd?: Maybe<AppEnv>
  userAppEnvWalletRemove?: Maybe<AppEnv>
  userAppUserAdd?: Maybe<App>
  userAppUserRemove?: Maybe<App>
  userAppUserUpdateRole?: Maybe<App>
  userCreateAppEnv?: Maybe<AppEnv>
  userDeleteAppEnv?: Maybe<AppEnv>
  userDeleteWallet?: Maybe<Wallet>
  userGenerateWallet?: Maybe<Wallet>
  userImportWallet?: Maybe<Wallet>
  userUpdateApp?: Maybe<App>
  userUpdateAppEnv?: Maybe<AppEnv>
  userUpdateAppMint?: Maybe<AppMint>
}

export type MutationAdminCreateAppArgs = {
  input: AdminAppCreateInput
}

export type MutationAdminCreateClusterArgs = {
  input: AdminClusterCreateInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminUserCreateInput
}

export type MutationAdminDeleteAppArgs = {
  appId: Scalars['String']
}

export type MutationAdminDeleteAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
}

export type MutationAdminDeleteClusterArgs = {
  clusterId: Scalars['String']
}

export type MutationAdminDeleteMintArgs = {
  mintId: Scalars['String']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminDeleteWalletArgs = {
  walletId: Scalars['String']
}

export type MutationAdminMintCreateArgs = {
  input: AdminMintCreateInput
}

export type MutationAdminMintImportWalletArgs = {
  mintId: Scalars['String']
  secret: Scalars['String']
}

export type MutationAdminQueueCleanArgs = {
  status?: InputMaybe<JobStatus>
  type: QueueType
}

export type MutationAdminQueueDeleteJobArgs = {
  jobId: Scalars['String']
  type: QueueType
}

export type MutationAdminQueueLoadArgs = {
  input: AdminQueueLoadInput
}

export type MutationAdminQueuePauseArgs = {
  type: QueueType
}

export type MutationAdminQueueResumeArgs = {
  type: QueueType
}

export type MutationAdminUpdateAppArgs = {
  appId: Scalars['String']
  input: AdminAppUpdateInput
}

export type MutationAdminUpdateClusterArgs = {
  clusterId: Scalars['String']
  input: AdminClusterUpdateInput
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUserUpdateInput
  userId: Scalars['String']
}

export type MutationLoginArgs = {
  input: UserLoginInput
}

export type MutationUserAppEnvAddAllowedIpArgs = {
  appEnvId: Scalars['String']
  ip: Scalars['String']
}

export type MutationUserAppEnvAddAllowedUaArgs = {
  appEnvId: Scalars['String']
  ua: Scalars['String']
}

export type MutationUserAppEnvAddBlockedIpArgs = {
  appEnvId: Scalars['String']
  ip: Scalars['String']
}

export type MutationUserAppEnvAddBlockedUaArgs = {
  appEnvId: Scalars['String']
  ua: Scalars['String']
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

export type MutationUserAppEnvPurgeTransactionsArgs = {
  appEnvId: Scalars['String']
  status?: InputMaybe<TransactionStatus>
}

export type MutationUserAppEnvRemoveAllowedIpArgs = {
  appEnvId: Scalars['String']
  ip: Scalars['String']
}

export type MutationUserAppEnvRemoveAllowedUaArgs = {
  appEnvId: Scalars['String']
  ua: Scalars['String']
}

export type MutationUserAppEnvRemoveBlockedIpArgs = {
  appEnvId: Scalars['String']
  ip: Scalars['String']
}

export type MutationUserAppEnvRemoveBlockedUaArgs = {
  appEnvId: Scalars['String']
  ua: Scalars['String']
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
  input: UserAppUserAddInput
}

export type MutationUserAppUserRemoveArgs = {
  appId: Scalars['String']
  input: UserAppUserRemoveInput
}

export type MutationUserAppUserUpdateRoleArgs = {
  appId: Scalars['String']
  input: UserAppUserUpdateRoleInput
}

export type MutationUserCreateAppEnvArgs = {
  appId: Scalars['String']
  clusterId: Scalars['String']
  input: UserAppEnvCreateInput
}

export type MutationUserDeleteAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
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
  secret: Scalars['String']
}

export type MutationUserUpdateAppArgs = {
  appId: Scalars['String']
  input: UserAppUpdateInput
}

export type MutationUserUpdateAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  input: UserAppEnvUpdateInput
}

export type MutationUserUpdateAppMintArgs = {
  appId: Scalars['String']
  appMintId: Scalars['String']
  input: UserAppMintUpdateInput
}

export type Query = {
  __typename?: 'Query'
  adminApp?: Maybe<App>
  adminApps?: Maybe<Array<App>>
  adminCluster?: Maybe<Cluster>
  adminClusters?: Maybe<Array<Cluster>>
  adminQueue?: Maybe<Queue>
  adminQueueJobs?: Maybe<Array<Job>>
  adminQueues?: Maybe<Array<Queue>>
  adminUser?: Maybe<User>
  adminUsers?: Maybe<Array<User>>
  adminWallet?: Maybe<Wallet>
  adminWallets?: Maybe<Array<Wallet>>
  me?: Maybe<User>
  uptime: Scalars['Float']
  userApp?: Maybe<App>
  userAppEnv?: Maybe<AppEnv>
  userAppEnvStats?: Maybe<AppEnvStats>
  userAppRole?: Maybe<AppUserRole>
  userApps?: Maybe<Array<App>>
  userCluster?: Maybe<Cluster>
  userClusters?: Maybe<Array<Cluster>>
  userSearchUsers?: Maybe<Array<User>>
  userTransaction?: Maybe<Transaction>
  userTransactionCounter?: Maybe<TransactionCounter>
  userTransactions?: Maybe<Array<Transaction>>
  userWallet?: Maybe<Wallet>
  userWalletAirdrop?: Maybe<WalletAirdropResponse>
  userWalletBalance?: Maybe<Scalars['String']>
  userWallets?: Maybe<Array<Wallet>>
  webConfig: WebConfig
}

export type QueryAdminAppArgs = {
  appId: Scalars['String']
}

export type QueryAdminClusterArgs = {
  clusterId: Scalars['String']
}

export type QueryAdminQueueArgs = {
  type: QueueType
}

export type QueryAdminQueueJobsArgs = {
  statuses: Array<JobStatus>
  type: QueueType
}

export type QueryAdminUserArgs = {
  userId: Scalars['String']
}

export type QueryAdminWalletArgs = {
  walletId: Scalars['String']
}

export type QueryUserAppArgs = {
  appId: Scalars['String']
}

export type QueryUserAppEnvArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
}

export type QueryUserAppEnvStatsArgs = {
  appEnvId: Scalars['String']
}

export type QueryUserAppRoleArgs = {
  appId: Scalars['String']
}

export type QueryUserClusterArgs = {
  clusterId: Scalars['String']
}

export type QueryUserSearchUsersArgs = {
  input: UserSearchUserInput
}

export type QueryUserTransactionArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  transactionId: Scalars['String']
}

export type QueryUserTransactionCounterArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  input?: InputMaybe<UserTransactionListInput>
}

export type QueryUserTransactionsArgs = {
  appEnvId: Scalars['String']
  appId: Scalars['String']
  input?: InputMaybe<UserTransactionListInput>
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

export type QueryUserWalletsArgs = {
  appEnvId: Scalars['String']
}

export type Queue = {
  __typename?: 'Queue'
  count?: Maybe<QueueCount>
  info?: Maybe<Scalars['JSON']>
  isPaused?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  type: QueueType
}

export type QueueCount = {
  __typename?: 'QueueCount'
  active?: Maybe<Scalars['Int']>
  completed?: Maybe<Scalars['Int']>
  delayed?: Maybe<Scalars['Int']>
  failed?: Maybe<Scalars['Int']>
  paused?: Maybe<Scalars['Int']>
  waiting?: Maybe<Scalars['Int']>
}

export enum QueueType {
  CloseAccount = 'CloseAccount',
}

export type Transaction = {
  __typename?: 'Transaction'
  amount?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  decimals?: Maybe<Scalars['Int']>
  destination?: Maybe<Scalars['String']>
  errors?: Maybe<Array<TransactionError>>
  explorerUrl?: Maybe<Scalars['String']>
  feePayer?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  ip?: Maybe<Scalars['String']>
  mint?: Maybe<Scalars['String']>
  processingDuration?: Maybe<Scalars['Int']>
  reference?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  solanaCommitted?: Maybe<Scalars['DateTime']>
  solanaCommittedDuration?: Maybe<Scalars['Int']>
  solanaFinalized?: Maybe<Scalars['DateTime']>
  solanaFinalizedDuration?: Maybe<Scalars['Int']>
  solanaStart?: Maybe<Scalars['DateTime']>
  solanaTransaction?: Maybe<Scalars['JSON']>
  source?: Maybe<Scalars['String']>
  status: TransactionStatus
  totalDuration?: Maybe<Scalars['Int']>
  tx?: Maybe<Scalars['String']>
  ua?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  webhookEventDuration?: Maybe<Scalars['Int']>
  webhookEventEnd?: Maybe<Scalars['DateTime']>
  webhookEventIncoming?: Maybe<Webhook>
  webhookEventOutgoing?: Maybe<Webhook>
  webhookEventStart?: Maybe<Scalars['DateTime']>
  webhookVerifyDuration?: Maybe<Scalars['Int']>
  webhookVerifyEnd?: Maybe<Scalars['DateTime']>
  webhookVerifyIncoming?: Maybe<Webhook>
  webhookVerifyOutgoing?: Maybe<Webhook>
  webhookVerifyStart?: Maybe<Scalars['DateTime']>
}

export type TransactionCounter = {
  __typename?: 'TransactionCounter'
  limit?: Maybe<Scalars['Float']>
  page?: Maybe<Scalars['Float']>
  pageCount?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
}

export type TransactionError = {
  __typename?: 'TransactionError'
  id?: Maybe<Scalars['String']>
  instruction?: Maybe<Scalars['Int']>
  logs?: Maybe<Array<Scalars['String']>>
  message?: Maybe<Scalars['String']>
  type: TransactionErrorType
}

export enum TransactionErrorType {
  BadNonce = 'BadNonce',
  InvalidAccount = 'InvalidAccount',
  SomeError = 'SomeError',
  Timeout = 'Timeout',
  Unknown = 'Unknown',
  WebhookFailed = 'WebhookFailed',
}

export enum TransactionStatus {
  Committed = 'Committed',
  Confirmed = 'Confirmed',
  Failed = 'Failed',
  Finalized = 'Finalized',
  Processing = 'Processing',
}

export type User = {
  __typename?: 'User'
  apps?: Maybe<Array<AppUser>>
  avatarUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  emails?: Maybe<Array<UserEmail>>
  id: Scalars['String']
  identities?: Maybe<Array<UserIdentity>>
  name?: Maybe<Scalars['String']>
  role?: Maybe<UserRole>
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserAppEnvCreateInput = {
  name: Scalars['String']
}

export type UserAppEnvUpdateInput = {
  solanaTransactionMaxRetries?: InputMaybe<Scalars['Int']>
  solanaTransactionSkipPreflight?: InputMaybe<Scalars['Boolean']>
  webhookBalanceEnabled?: InputMaybe<Scalars['Boolean']>
  webhookBalanceThreshold?: InputMaybe<Scalars['String']>
  webhookBalanceUrl?: InputMaybe<Scalars['String']>
  webhookDebugging?: InputMaybe<Scalars['Boolean']>
  webhookEventEnabled?: InputMaybe<Scalars['Boolean']>
  webhookEventUrl?: InputMaybe<Scalars['String']>
  webhookSecret?: InputMaybe<Scalars['String']>
  webhookVerifyEnabled?: InputMaybe<Scalars['Boolean']>
  webhookVerifyUrl?: InputMaybe<Scalars['String']>
}

export type UserAppMintUpdateInput = {
  addMemo?: InputMaybe<Scalars['Boolean']>
}

export type UserAppUpdateInput = {
  logoUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type UserAppUserAddInput = {
  role: AppUserRole
  userId: Scalars['String']
}

export type UserAppUserRemoveInput = {
  userId: Scalars['String']
}

export type UserAppUserUpdateRoleInput = {
  role: AppUserRole
  userId: Scalars['String']
}

export type UserEmail = {
  __typename?: 'UserEmail'
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type UserIdentity = {
  __typename?: 'UserIdentity'
  createdAt: Scalars['DateTime']
  externalId: Scalars['String']
  id: Scalars['String']
  profile: Scalars['JSON']
  type?: Maybe<UserIdentityType>
  updatedAt: Scalars['DateTime']
}

export enum UserIdentityType {
  Discord = 'Discord',
  GitHub = 'GitHub',
  Google = 'Google',
}

export type UserLoginInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export type UserSearchUserInput = {
  query?: InputMaybe<Scalars['String']>
}

export type UserTransactionListInput = {
  destination?: InputMaybe<Scalars['String']>
  ip?: InputMaybe<Scalars['String']>
  limit?: InputMaybe<Scalars['Float']>
  page?: InputMaybe<Scalars['Float']>
  reference?: InputMaybe<Scalars['String']>
  signature?: InputMaybe<Scalars['String']>
  source?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Array<TransactionStatus>>
  ua?: InputMaybe<Scalars['String']>
}

export type Wallet = {
  __typename?: 'Wallet'
  appEnvs?: Maybe<Array<AppEnv>>
  appMints?: Maybe<Array<AppMint>>
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

export enum WalletType {
  Generated = 'Generated',
  Imported = 'Imported',
  Provisioned = 'Provisioned',
}

export type WebConfig = {
  __typename?: 'WebConfig'
  discordEnabled: Scalars['Boolean']
  githubEnabled: Scalars['Boolean']
  googleEnabled: Scalars['Boolean']
  passwordEnabled: Scalars['Boolean']
}

export type Webhook = {
  __typename?: 'Webhook'
  createdAt: Scalars['DateTime']
  direction: WebhookDirection
  headers?: Maybe<Scalars['JSON']>
  id: Scalars['String']
  payload?: Maybe<Scalars['JSON']>
  responseError?: Maybe<Scalars['String']>
  responsePayload?: Maybe<Scalars['JSON']>
  responseStatus?: Maybe<Scalars['Int']>
  type: WebhookType
  updatedAt: Scalars['DateTime']
}

export enum WebhookDirection {
  Incoming = 'Incoming',
  Outgoing = 'Outgoing',
}

export enum WebhookType {
  Balance = 'Balance',
  Event = 'Event',
  Verify = 'Verify',
}

export type AdminCreateAppMutationVariables = Exact<{
  input: AdminAppCreateInput
}>

export type AdminCreateAppMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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

export type AdminUpdateAppMutationVariables = Exact<{
  appId: Scalars['String']
  input: AdminAppUpdateInput
}>

export type AdminUpdateAppMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
  } | null
}

export type AdminDeleteAppEnvMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
}>

export type AdminDeleteAppEnvMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type AdminAppsQueryVariables = Exact<{ [key: string]: never }>

export type AdminAppsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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
  logoUrl?: string | null
  maxEnvs: number
  name?: string | null
  defaultEnvUrl?: string | null
  settingsUrl?: string | null
}

export type AppEnvDetailsFragment = {
  __typename?: 'AppEnv'
  id: string
  createdAt: any
  updatedAt: any
  endpoint?: string | null
  key?: string | null
  ipsAllowed?: Array<string> | null
  ipsBlocked?: Array<string> | null
  name?: string | null
  solanaTransactionMaxRetries?: number | null
  solanaTransactionSkipPreflight?: boolean | null
  uasAllowed?: Array<string> | null
  uasBlocked?: Array<string> | null
  webhookBalanceEnabled?: boolean | null
  webhookBalanceUrl?: string | null
  webhookBalanceThreshold?: string | null
  webhookDebugging?: boolean | null
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
    maxEnvs: number
    name?: string | null
  } | null
  cluster?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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
    addMemo?: boolean | null
    order?: number | null
    mint?: {
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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

export type AppEnvStatsDetailsFragment = {
  __typename?: 'AppEnvStats'
  transactionCount?: {
    __typename?: 'AppEnvTransactionCount'
    Committed?: number | null
    Confirmed?: number | null
    Failed?: number | null
    Finalized?: number | null
    Processing?: number | null
  } | null
}

export type AppEnvTransactionCountDetailsFragment = {
  __typename?: 'AppEnvTransactionCount'
  Committed?: number | null
  Confirmed?: number | null
  Failed?: number | null
  Finalized?: number | null
  Processing?: number | null
}

export type AppMintDetailsFragment = {
  __typename?: 'AppMint'
  id: string
  createdAt: any
  updatedAt: any
  addMemo?: boolean | null
  order?: number | null
  mint?: {
    __typename?: 'Mint'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    addMemo?: boolean | null
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

export type TransactionDetailsFragment = {
  __typename?: 'Transaction'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  amount?: string | null
  decimals?: number | null
  destination?: string | null
  explorerUrl?: string | null
  feePayer?: string | null
  ip?: string | null
  mint?: string | null
  processingDuration?: number | null
  reference?: string | null
  signature?: string | null
  solanaCommittedDuration?: number | null
  solanaFinalized?: any | null
  solanaFinalizedDuration?: number | null
  solanaCommitted?: any | null
  solanaStart?: any | null
  solanaTransaction?: any | null
  source?: string | null
  status: TransactionStatus
  totalDuration?: number | null
  tx?: string | null
  ua?: string | null
  webhookEventDuration?: number | null
  webhookEventEnd?: any | null
  webhookEventStart?: any | null
  webhookVerifyDuration?: number | null
  webhookVerifyEnd?: any | null
  webhookVerifyStart?: any | null
  errors?: Array<{
    __typename?: 'TransactionError'
    id?: string | null
    logs?: Array<string> | null
    message?: string | null
    type: TransactionErrorType
    instruction?: number | null
  }> | null
  webhookEventIncoming?: {
    __typename?: 'Webhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: WebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: WebhookType
  } | null
  webhookEventOutgoing?: {
    __typename?: 'Webhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: WebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: WebhookType
  } | null
  webhookVerifyIncoming?: {
    __typename?: 'Webhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: WebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: WebhookType
  } | null
  webhookVerifyOutgoing?: {
    __typename?: 'Webhook'
    id: string
    createdAt: any
    updatedAt: any
    direction: WebhookDirection
    headers?: any | null
    payload?: any | null
    responseError?: string | null
    responsePayload?: any | null
    responseStatus?: number | null
    type: WebhookType
  } | null
}

export type TransactionErrorDetailsFragment = {
  __typename?: 'TransactionError'
  id?: string | null
  logs?: Array<string> | null
  message?: string | null
  type: TransactionErrorType
  instruction?: number | null
}

export type AppUserDetailsFragment = {
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
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
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
}

export type WebhookDetailsFragment = {
  __typename?: 'Webhook'
  id: string
  createdAt: any
  updatedAt: any
  direction: WebhookDirection
  headers?: any | null
  payload?: any | null
  responseError?: string | null
  responsePayload?: any | null
  responseStatus?: number | null
  type: WebhookType
}

export type UserAppEnvStatsQueryVariables = Exact<{
  appEnvId: Scalars['String']
}>

export type UserAppEnvStatsQuery = {
  __typename?: 'Query'
  stats?: {
    __typename?: 'AppEnvStats'
    transactionCount?: {
      __typename?: 'AppEnvTransactionCount'
      Committed?: number | null
      Confirmed?: number | null
      Failed?: number | null
      Finalized?: number | null
      Processing?: number | null
    } | null
  } | null
}

export type UserUpdateAppMutationVariables = Exact<{
  appId: Scalars['String']
  input: UserAppUpdateInput
}>

export type UserUpdateAppMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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

export type UserCreateAppEnvMutationVariables = Exact<{
  appId: Scalars['String']
  clusterId: Scalars['String']
  input: UserAppEnvCreateInput
}>

export type UserCreateAppEnvMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserUpdateAppEnvMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  input: UserAppEnvUpdateInput
}>

export type UserUpdateAppEnvMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserUpdateAppMintMutationVariables = Exact<{
  appId: Scalars['String']
  appMintId: Scalars['String']
  input: UserAppMintUpdateInput
}>

export type UserUpdateAppMintMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'AppMint'
    id: string
    createdAt: any
    updatedAt: any
    addMemo?: boolean | null
    order?: number | null
    mint?: {
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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
  } | null
}

export type UserAppUserAddMutationVariables = Exact<{
  appId: Scalars['String']
  input: UserAppUserAddInput
}>

export type UserAppUserAddMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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
  input: UserAppUserRemoveInput
}>

export type UserAppUserRemoveMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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
  input: UserAppUserUpdateRoleInput
}>

export type UserAppUserUpdateRoleMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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

export type UserAppEnvAddAllowedIpMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ip: Scalars['String']
}>

export type UserAppEnvAddAllowedIpMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvRemoveAllowedIpMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ip: Scalars['String']
}>

export type UserAppEnvRemoveAllowedIpMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvAddBlockedIpMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ip: Scalars['String']
}>

export type UserAppEnvAddBlockedIpMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvRemoveBlockedIpMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ip: Scalars['String']
}>

export type UserAppEnvRemoveBlockedIpMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvAddAllowedUaMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ua: Scalars['String']
}>

export type UserAppEnvAddAllowedUaMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvRemoveAllowedUaMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ua: Scalars['String']
}>

export type UserAppEnvRemoveAllowedUaMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvAddBlockedUaMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ua: Scalars['String']
}>

export type UserAppEnvAddBlockedUaMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvRemoveBlockedUaMutationVariables = Exact<{
  appEnvId: Scalars['String']
  ua: Scalars['String']
}>

export type UserAppEnvRemoveBlockedUaMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserAppEnvPurgeTransactionsMutationVariables = Exact<{
  appEnvId: Scalars['String']
  status?: InputMaybe<TransactionStatus>
}>

export type UserAppEnvPurgeTransactionsMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserDeleteAppEnvMutationVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
}>

export type UserDeleteAppEnvMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'AppEnv'
    id: string
    createdAt: any
    updatedAt: any
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserTransactionQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  transactionId: Scalars['String']
}>

export type UserTransactionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Transaction'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: string | null
    decimals?: number | null
    destination?: string | null
    explorerUrl?: string | null
    feePayer?: string | null
    ip?: string | null
    mint?: string | null
    processingDuration?: number | null
    reference?: string | null
    signature?: string | null
    solanaCommittedDuration?: number | null
    solanaFinalized?: any | null
    solanaFinalizedDuration?: number | null
    solanaCommitted?: any | null
    solanaStart?: any | null
    solanaTransaction?: any | null
    source?: string | null
    status: TransactionStatus
    totalDuration?: number | null
    tx?: string | null
    ua?: string | null
    webhookEventDuration?: number | null
    webhookEventEnd?: any | null
    webhookEventStart?: any | null
    webhookVerifyDuration?: number | null
    webhookVerifyEnd?: any | null
    webhookVerifyStart?: any | null
    errors?: Array<{
      __typename?: 'TransactionError'
      id?: string | null
      logs?: Array<string> | null
      message?: string | null
      type: TransactionErrorType
      instruction?: number | null
    }> | null
    webhookEventIncoming?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
    webhookEventOutgoing?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
    webhookVerifyIncoming?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
    webhookVerifyOutgoing?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
  } | null
}

export type UserTransactionsQueryVariables = Exact<{
  appId: Scalars['String']
  appEnvId: Scalars['String']
  input?: InputMaybe<UserTransactionListInput>
}>

export type UserTransactionsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Transaction'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: string | null
    decimals?: number | null
    destination?: string | null
    explorerUrl?: string | null
    feePayer?: string | null
    ip?: string | null
    mint?: string | null
    processingDuration?: number | null
    reference?: string | null
    signature?: string | null
    solanaCommittedDuration?: number | null
    solanaFinalized?: any | null
    solanaFinalizedDuration?: number | null
    solanaCommitted?: any | null
    solanaStart?: any | null
    solanaTransaction?: any | null
    source?: string | null
    status: TransactionStatus
    totalDuration?: number | null
    tx?: string | null
    ua?: string | null
    webhookEventDuration?: number | null
    webhookEventEnd?: any | null
    webhookEventStart?: any | null
    webhookVerifyDuration?: number | null
    webhookVerifyEnd?: any | null
    webhookVerifyStart?: any | null
    errors?: Array<{
      __typename?: 'TransactionError'
      id?: string | null
      logs?: Array<string> | null
      message?: string | null
      type: TransactionErrorType
      instruction?: number | null
    }> | null
    webhookEventIncoming?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
    webhookEventOutgoing?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
    webhookVerifyIncoming?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
    webhookVerifyOutgoing?: {
      __typename?: 'Webhook'
      id: string
      createdAt: any
      updatedAt: any
      direction: WebhookDirection
      headers?: any | null
      payload?: any | null
      responseError?: string | null
      responsePayload?: any | null
      responseStatus?: number | null
      type: WebhookType
    } | null
  }> | null
  count?: {
    __typename?: 'TransactionCounter'
    limit?: number | null
    page?: number | null
    pageCount?: number | null
    total?: number | null
  } | null
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
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
    logoUrl?: string | null
    maxEnvs: number
    name?: string | null
    defaultEnvUrl?: string | null
    settingsUrl?: string | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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
    endpoint?: string | null
    key?: string | null
    ipsAllowed?: Array<string> | null
    ipsBlocked?: Array<string> | null
    name?: string | null
    solanaTransactionMaxRetries?: number | null
    solanaTransactionSkipPreflight?: boolean | null
    uasAllowed?: Array<string> | null
    uasBlocked?: Array<string> | null
    webhookBalanceEnabled?: boolean | null
    webhookBalanceUrl?: string | null
    webhookBalanceThreshold?: string | null
    webhookDebugging?: boolean | null
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
      maxEnvs: number
      name?: string | null
    } | null
    cluster?: {
      __typename?: 'Cluster'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      endpointPrivate?: string | null
      endpointPublic?: string | null
      explorer?: string | null
      name?: string | null
      status?: ClusterStatus | null
      type?: ClusterType | null
      mints?: Array<{
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
  input: UserLoginInput
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
  endpointPrivate?: string | null
  endpointPublic?: string | null
  explorer?: string | null
  name?: string | null
  status?: ClusterStatus | null
  type?: ClusterType | null
}

export type MintDetailsFragment = {
  __typename?: 'Mint'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  addMemo?: boolean | null
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

export type AdminMintCreateMutationVariables = Exact<{
  input: AdminMintCreateInput
}>

export type AdminMintCreateMutation = {
  __typename?: 'Mutation'
  adminMintCreate?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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

export type AdminDeleteMintMutationVariables = Exact<{
  mintId: Scalars['String']
}>

export type AdminDeleteMintMutation = {
  __typename?: 'Mutation'
  deleted?: {
    __typename?: 'Mint'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    addMemo?: boolean | null
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
}

export type AdminMintImportWalletMutationVariables = Exact<{
  mintId: Scalars['String']
  secret: Scalars['String']
}>

export type AdminMintImportWalletMutation = {
  __typename?: 'Mutation'
  adminMintImportWallet?: {
    __typename?: 'Mint'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    addMemo?: boolean | null
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
}

export type AdminCreateClusterMutationVariables = Exact<{
  input: AdminClusterCreateInput
}>

export type AdminCreateClusterMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
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
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
  } | null
}

export type AdminUpdateClusterMutationVariables = Exact<{
  clusterId: Scalars['String']
  input: AdminClusterUpdateInput
}>

export type AdminUpdateClusterMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
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
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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

export type AdminClustersQueryVariables = Exact<{ [key: string]: never }>

export type AdminClustersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    envs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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

export type UserClusterQueryVariables = Exact<{
  clusterId: Scalars['String']
}>

export type UserClusterQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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

export type UserClustersQueryVariables = Exact<{ [key: string]: never }>

export type UserClustersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Cluster'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    endpointPrivate?: string | null
    endpointPublic?: string | null
    explorer?: string | null
    name?: string | null
    status?: ClusterStatus | null
    type?: ClusterType | null
    mints?: Array<{
      __typename?: 'Mint'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      addMemo?: boolean | null
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

export type WebConfigQueryVariables = Exact<{ [key: string]: never }>

export type WebConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'WebConfig'
    discordEnabled: boolean
    githubEnabled: boolean
    googleEnabled: boolean
    passwordEnabled: boolean
  }
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type QueueDetailsFragment = {
  __typename?: 'Queue'
  type: QueueType
  name: string
  info?: any | null
  isPaused?: boolean | null
  count?: {
    __typename?: 'QueueCount'
    active?: number | null
    completed?: number | null
    delayed?: number | null
    failed?: number | null
    paused?: number | null
    waiting?: number | null
  } | null
}

export type QueueCountDetailsFragment = {
  __typename?: 'QueueCount'
  active?: number | null
  completed?: number | null
  delayed?: number | null
  failed?: number | null
  paused?: number | null
  waiting?: number | null
}

export type JobDetailsFragment = {
  __typename?: 'Job'
  id?: string | null
  data?: any | null
  opts?: any | null
  attemptsMade?: number | null
  processedOn?: number | null
  finishedOn?: number | null
  timestamp?: number | null
  name?: string | null
  stacktrace?: Array<string> | null
  returnvalue?: any | null
  failedReason?: string | null
}

export type AdminQueuesQueryVariables = Exact<{ [key: string]: never }>

export type AdminQueuesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  }> | null
}

export type AdminQueueQueryVariables = Exact<{
  type: QueueType
}>

export type AdminQueueQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  } | null
}

export type AdminQueueJobsQueryVariables = Exact<{
  type: QueueType
  statuses: Array<JobStatus> | JobStatus
}>

export type AdminQueueJobsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Job'
    id?: string | null
    data?: any | null
    opts?: any | null
    attemptsMade?: number | null
    processedOn?: number | null
    finishedOn?: number | null
    timestamp?: number | null
    name?: string | null
    stacktrace?: Array<string> | null
    returnvalue?: any | null
    failedReason?: string | null
  }> | null
}

export type AdminQueueLoadMutationVariables = Exact<{
  input: AdminQueueLoadInput
}>

export type AdminQueueLoadMutation = {
  __typename?: 'Mutation'
  loaded?: {
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  } | null
}

export type AdminQueueCleanMutationVariables = Exact<{
  type: QueueType
  status?: InputMaybe<JobStatus>
}>

export type AdminQueueCleanMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminQueueDeleteJobMutationVariables = Exact<{
  type: QueueType
  jobId: Scalars['String']
}>

export type AdminQueueDeleteJobMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminQueuePauseMutationVariables = Exact<{
  type: QueueType
}>

export type AdminQueuePauseMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminQueueResumeMutationVariables = Exact<{
  type: QueueType
}>

export type AdminQueueResumeMutation = { __typename?: 'Mutation'; resumed?: boolean | null }

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
  input: AdminUserCreateInput
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
  input: AdminUserUpdateInput
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
        logoUrl?: string | null
        maxEnvs: number
        name?: string | null
        defaultEnvUrl?: string | null
        settingsUrl?: string | null
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

export type UserSearchUsersQueryVariables = Exact<{
  input: UserSearchUserInput
}>

export type UserSearchUsersQuery = {
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
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
    appEnvs?: Array<{
      __typename?: 'AppEnv'
      id: string
      createdAt: any
      updatedAt: any
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
      endpoint?: string | null
      key?: string | null
      ipsAllowed?: Array<string> | null
      ipsBlocked?: Array<string> | null
      name?: string | null
      solanaTransactionMaxRetries?: number | null
      solanaTransactionSkipPreflight?: boolean | null
      uasAllowed?: Array<string> | null
      uasBlocked?: Array<string> | null
      webhookBalanceEnabled?: boolean | null
      webhookBalanceUrl?: string | null
      webhookBalanceThreshold?: string | null
      webhookDebugging?: boolean | null
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
        maxEnvs: number
        name?: string | null
      } | null
      cluster?: {
        __typename?: 'Cluster'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        endpointPrivate?: string | null
        endpointPublic?: string | null
        explorer?: string | null
        name?: string | null
        status?: ClusterStatus | null
        type?: ClusterType | null
        mints?: Array<{
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
        addMemo?: boolean | null
        order?: number | null
        mint?: {
          __typename?: 'Mint'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          addMemo?: boolean | null
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
  secret: Scalars['String']
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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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

export type UserWalletBalanceQuery = { __typename?: 'Query'; balance?: string | null }

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
      addMemo?: boolean | null
      order?: number | null
      mint?: {
        __typename?: 'Mint'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        addMemo?: boolean | null
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
    endpointPrivate
    endpointPublic
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
    addMemo
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
    addMemo
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
    endpoint
    key
    app {
      id
      createdAt
      updatedAt
      index
      maxEnvs
      name
    }
    cluster {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
    ipsAllowed
    ipsBlocked
    mints {
      ...AppMintDetails
    }
    name
    solanaTransactionMaxRetries
    solanaTransactionSkipPreflight
    uasAllowed
    uasBlocked
    webhookBalanceEnabled
    webhookBalanceUrl
    webhookBalanceThreshold
    webhookDebugging
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
export const AppEnvTransactionCountDetailsFragmentDoc = gql`
  fragment AppEnvTransactionCountDetails on AppEnvTransactionCount {
    Committed
    Confirmed
    Failed
    Finalized
    Processing
  }
`
export const AppEnvStatsDetailsFragmentDoc = gql`
  fragment AppEnvStatsDetails on AppEnvStats {
    transactionCount {
      ...AppEnvTransactionCountDetails
    }
  }
  ${AppEnvTransactionCountDetailsFragmentDoc}
`
export const TransactionErrorDetailsFragmentDoc = gql`
  fragment TransactionErrorDetails on TransactionError {
    id
    logs
    message
    type
    instruction
  }
`
export const WebhookDetailsFragmentDoc = gql`
  fragment WebhookDetails on Webhook {
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
export const TransactionDetailsFragmentDoc = gql`
  fragment TransactionDetails on Transaction {
    id
    createdAt
    updatedAt
    amount
    decimals
    destination
    errors {
      ...TransactionErrorDetails
    }
    explorerUrl
    feePayer
    ip
    mint
    processingDuration
    reference
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
    tx
    ua
    webhookEventDuration
    webhookEventIncoming {
      ...WebhookDetails
    }
    webhookEventOutgoing {
      ...WebhookDetails
    }
    webhookEventEnd
    webhookEventStart
    webhookVerifyDuration
    webhookVerifyEnd
    webhookVerifyIncoming {
      ...WebhookDetails
    }
    webhookVerifyOutgoing {
      ...WebhookDetails
    }
    webhookVerifyStart
  }
  ${TransactionErrorDetailsFragmentDoc}
  ${WebhookDetailsFragmentDoc}
`
export const AppDetailsFragmentDoc = gql`
  fragment AppDetails on App {
    id
    createdAt
    updatedAt
    index
    logoUrl
    maxEnvs
    name
    defaultEnvUrl
    settingsUrl
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
export const QueueCountDetailsFragmentDoc = gql`
  fragment QueueCountDetails on QueueCount {
    active
    completed
    delayed
    failed
    paused
    waiting
  }
`
export const QueueDetailsFragmentDoc = gql`
  fragment QueueDetails on Queue {
    type
    name
    count {
      ...QueueCountDetails
    }
    info
    isPaused
  }
  ${QueueCountDetailsFragmentDoc}
`
export const JobDetailsFragmentDoc = gql`
  fragment JobDetails on Job {
    id
    data
    opts
    attemptsMade
    processedOn
    finishedOn
    timestamp
    name
    stacktrace
    returnvalue
    failedReason
  }
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
export const AdminCreateAppDocument = gql`
  mutation AdminCreateApp($input: AdminAppCreateInput!) {
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
export const AdminUpdateAppDocument = gql`
  mutation AdminUpdateApp($appId: String!, $input: AdminAppUpdateInput!) {
    updated: adminUpdateApp(appId: $appId, input: $input) {
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

export function useAdminUpdateAppMutation() {
  return Urql.useMutation<AdminUpdateAppMutation, AdminUpdateAppMutationVariables>(AdminUpdateAppDocument)
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
export const AdminDeleteAppEnvDocument = gql`
  mutation AdminDeleteAppEnv($appId: String!, $appEnvId: String!) {
    deleted: adminDeleteAppEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useAdminDeleteAppEnvMutation() {
  return Urql.useMutation<AdminDeleteAppEnvMutation, AdminDeleteAppEnvMutationVariables>(AdminDeleteAppEnvDocument)
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
  return Urql.useQuery<AdminAppsQuery, AdminAppsQueryVariables>({ query: AdminAppsDocument, ...options })
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
  return Urql.useQuery<AdminAppQuery, AdminAppQueryVariables>({ query: AdminAppDocument, ...options })
}
export const UserAppEnvStatsDocument = gql`
  query UserAppEnvStats($appEnvId: String!) {
    stats: userAppEnvStats(appEnvId: $appEnvId) {
      ...AppEnvStatsDetails
    }
  }
  ${AppEnvStatsDetailsFragmentDoc}
`

export function useUserAppEnvStatsQuery(options: Omit<Urql.UseQueryArgs<UserAppEnvStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserAppEnvStatsQuery, UserAppEnvStatsQueryVariables>({
    query: UserAppEnvStatsDocument,
    ...options,
  })
}
export const UserUpdateAppDocument = gql`
  mutation UserUpdateApp($appId: String!, $input: UserAppUpdateInput!) {
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
export const UserCreateAppEnvDocument = gql`
  mutation UserCreateAppEnv($appId: String!, $clusterId: String!, $input: UserAppEnvCreateInput!) {
    created: userCreateAppEnv(appId: $appId, clusterId: $clusterId, input: $input) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useUserCreateAppEnvMutation() {
  return Urql.useMutation<UserCreateAppEnvMutation, UserCreateAppEnvMutationVariables>(UserCreateAppEnvDocument)
}
export const UserUpdateAppEnvDocument = gql`
  mutation UserUpdateAppEnv($appId: String!, $appEnvId: String!, $input: UserAppEnvUpdateInput!) {
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
export const UserUpdateAppMintDocument = gql`
  mutation UserUpdateAppMint($appId: String!, $appMintId: String!, $input: UserAppMintUpdateInput!) {
    updated: userUpdateAppMint(appId: $appId, appMintId: $appMintId, input: $input) {
      ...AppMintDetails
    }
  }
  ${AppMintDetailsFragmentDoc}
`

export function useUserUpdateAppMintMutation() {
  return Urql.useMutation<UserUpdateAppMintMutation, UserUpdateAppMintMutationVariables>(UserUpdateAppMintDocument)
}
export const UserAppUserAddDocument = gql`
  mutation UserAppUserAdd($appId: String!, $input: UserAppUserAddInput!) {
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
  mutation UserAppUserRemove($appId: String!, $input: UserAppUserRemoveInput!) {
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
  mutation UserAppUserUpdateRole($appId: String!, $input: UserAppUserUpdateRoleInput!) {
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
export const UserAppEnvAddAllowedIpDocument = gql`
  mutation UserAppEnvAddAllowedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvAddAllowedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvAddAllowedIpMutation() {
  return Urql.useMutation<UserAppEnvAddAllowedIpMutation, UserAppEnvAddAllowedIpMutationVariables>(
    UserAppEnvAddAllowedIpDocument,
  )
}
export const UserAppEnvRemoveAllowedIpDocument = gql`
  mutation UserAppEnvRemoveAllowedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvRemoveAllowedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvRemoveAllowedIpMutation() {
  return Urql.useMutation<UserAppEnvRemoveAllowedIpMutation, UserAppEnvRemoveAllowedIpMutationVariables>(
    UserAppEnvRemoveAllowedIpDocument,
  )
}
export const UserAppEnvAddBlockedIpDocument = gql`
  mutation UserAppEnvAddBlockedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvAddBlockedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvAddBlockedIpMutation() {
  return Urql.useMutation<UserAppEnvAddBlockedIpMutation, UserAppEnvAddBlockedIpMutationVariables>(
    UserAppEnvAddBlockedIpDocument,
  )
}
export const UserAppEnvRemoveBlockedIpDocument = gql`
  mutation UserAppEnvRemoveBlockedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvRemoveBlockedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvRemoveBlockedIpMutation() {
  return Urql.useMutation<UserAppEnvRemoveBlockedIpMutation, UserAppEnvRemoveBlockedIpMutationVariables>(
    UserAppEnvRemoveBlockedIpDocument,
  )
}
export const UserAppEnvAddAllowedUaDocument = gql`
  mutation UserAppEnvAddAllowedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvAddAllowedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvAddAllowedUaMutation() {
  return Urql.useMutation<UserAppEnvAddAllowedUaMutation, UserAppEnvAddAllowedUaMutationVariables>(
    UserAppEnvAddAllowedUaDocument,
  )
}
export const UserAppEnvRemoveAllowedUaDocument = gql`
  mutation UserAppEnvRemoveAllowedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvRemoveAllowedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvRemoveAllowedUaMutation() {
  return Urql.useMutation<UserAppEnvRemoveAllowedUaMutation, UserAppEnvRemoveAllowedUaMutationVariables>(
    UserAppEnvRemoveAllowedUaDocument,
  )
}
export const UserAppEnvAddBlockedUaDocument = gql`
  mutation UserAppEnvAddBlockedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvAddBlockedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvAddBlockedUaMutation() {
  return Urql.useMutation<UserAppEnvAddBlockedUaMutation, UserAppEnvAddBlockedUaMutationVariables>(
    UserAppEnvAddBlockedUaDocument,
  )
}
export const UserAppEnvRemoveBlockedUaDocument = gql`
  mutation UserAppEnvRemoveBlockedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvRemoveBlockedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvRemoveBlockedUaMutation() {
  return Urql.useMutation<UserAppEnvRemoveBlockedUaMutation, UserAppEnvRemoveBlockedUaMutationVariables>(
    UserAppEnvRemoveBlockedUaDocument,
  )
}
export const UserAppEnvPurgeTransactionsDocument = gql`
  mutation UserAppEnvPurgeTransactions($appEnvId: String!, $status: TransactionStatus) {
    item: userAppEnvPurgeTransactions(appEnvId: $appEnvId, status: $status) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserAppEnvPurgeTransactionsMutation() {
  return Urql.useMutation<UserAppEnvPurgeTransactionsMutation, UserAppEnvPurgeTransactionsMutationVariables>(
    UserAppEnvPurgeTransactionsDocument,
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
  mutation UserAppEnvMintSetWallet($appId: String!, $appEnvId: String!, $mintId: String!, $walletId: String!) {
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
export const UserDeleteAppEnvDocument = gql`
  mutation UserDeleteAppEnv($appId: String!, $appEnvId: String!) {
    item: userDeleteAppEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetailsFragmentDoc}
`

export function useUserDeleteAppEnvMutation() {
  return Urql.useMutation<UserDeleteAppEnvMutation, UserDeleteAppEnvMutationVariables>(UserDeleteAppEnvDocument)
}
export const UserTransactionDocument = gql`
  query UserTransaction($appId: String!, $appEnvId: String!, $transactionId: String!) {
    item: userTransaction(appId: $appId, appEnvId: $appEnvId, transactionId: $transactionId) {
      ...TransactionDetails
    }
  }
  ${TransactionDetailsFragmentDoc}
`

export function useUserTransactionQuery(options: Omit<Urql.UseQueryArgs<UserTransactionQueryVariables>, 'query'>) {
  return Urql.useQuery<UserTransactionQuery, UserTransactionQueryVariables>({
    query: UserTransactionDocument,
    ...options,
  })
}
export const UserTransactionsDocument = gql`
  query UserTransactions($appId: String!, $appEnvId: String!, $input: UserTransactionListInput) {
    items: userTransactions(appId: $appId, appEnvId: $appEnvId, input: $input) {
      ...TransactionDetails
    }
    count: userTransactionCounter(appId: $appId, appEnvId: $appEnvId, input: $input) {
      limit
      page
      pageCount
      total
    }
  }
  ${TransactionDetailsFragmentDoc}
`

export function useUserTransactionsQuery(options: Omit<Urql.UseQueryArgs<UserTransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserTransactionsQuery, UserTransactionsQueryVariables>({
    query: UserTransactionsDocument,
    ...options,
  })
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
  return Urql.useQuery<UserAppsQuery, UserAppsQueryVariables>({ query: UserAppsDocument, ...options })
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
  return Urql.useQuery<UserAppQuery, UserAppQueryVariables>({ query: UserAppDocument, ...options })
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
  return Urql.useQuery<UserAppEnvQuery, UserAppEnvQueryVariables>({ query: UserAppEnvDocument, ...options })
}
export const LoginDocument = gql`
  mutation Login($input: UserLoginInput!) {
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
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options })
}
export const AdminMintCreateDocument = gql`
  mutation AdminMintCreate($input: AdminMintCreateInput!) {
    adminMintCreate(input: $input) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useAdminMintCreateMutation() {
  return Urql.useMutation<AdminMintCreateMutation, AdminMintCreateMutationVariables>(AdminMintCreateDocument)
}
export const AdminDeleteMintDocument = gql`
  mutation AdminDeleteMint($mintId: String!) {
    deleted: adminDeleteMint(mintId: $mintId) {
      ...MintDetails
    }
  }
  ${MintDetailsFragmentDoc}
`

export function useAdminDeleteMintMutation() {
  return Urql.useMutation<AdminDeleteMintMutation, AdminDeleteMintMutationVariables>(AdminDeleteMintDocument)
}
export const AdminMintImportWalletDocument = gql`
  mutation AdminMintImportWallet($mintId: String!, $secret: String!) {
    adminMintImportWallet(mintId: $mintId, secret: $secret) {
      ...MintDetails
    }
  }
  ${MintDetailsFragmentDoc}
`

export function useAdminMintImportWalletMutation() {
  return Urql.useMutation<AdminMintImportWalletMutation, AdminMintImportWalletMutationVariables>(
    AdminMintImportWalletDocument,
  )
}
export const AdminCreateClusterDocument = gql`
  mutation AdminCreateCluster($input: AdminClusterCreateInput!) {
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
  mutation AdminUpdateCluster($clusterId: String!, $input: AdminClusterUpdateInput!) {
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
  return Urql.useQuery<AdminClusterQuery, AdminClusterQueryVariables>({ query: AdminClusterDocument, ...options })
}
export const AdminClustersDocument = gql`
  query AdminClusters {
    items: adminClusters {
      ...ClusterDetails
      envs {
        ...AppEnvDetails
      }
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${AppEnvDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useAdminClustersQuery(options?: Omit<Urql.UseQueryArgs<AdminClustersQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminClustersQuery, AdminClustersQueryVariables>({ query: AdminClustersDocument, ...options })
}
export const UserClusterDocument = gql`
  query UserCluster($clusterId: String!) {
    item: userCluster(clusterId: $clusterId) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useUserClusterQuery(options: Omit<Urql.UseQueryArgs<UserClusterQueryVariables>, 'query'>) {
  return Urql.useQuery<UserClusterQuery, UserClusterQueryVariables>({ query: UserClusterDocument, ...options })
}
export const UserClustersDocument = gql`
  query UserClusters {
    items: userClusters {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetailsFragmentDoc}
  ${MintDetailsFragmentDoc}
`

export function useUserClustersQuery(options?: Omit<Urql.UseQueryArgs<UserClustersQueryVariables>, 'query'>) {
  return Urql.useQuery<UserClustersQuery, UserClustersQueryVariables>({ query: UserClustersDocument, ...options })
}
export const WebConfigDocument = gql`
  query WebConfig {
    config: webConfig {
      discordEnabled
      githubEnabled
      googleEnabled
      passwordEnabled
    }
  }
`

export function useWebConfigQuery(options?: Omit<Urql.UseQueryArgs<WebConfigQueryVariables>, 'query'>) {
  return Urql.useQuery<WebConfigQuery, WebConfigQueryVariables>({ query: WebConfigDocument, ...options })
}
export const UptimeDocument = gql`
  query Uptime {
    uptime
  }
`

export function useUptimeQuery(options?: Omit<Urql.UseQueryArgs<UptimeQueryVariables>, 'query'>) {
  return Urql.useQuery<UptimeQuery, UptimeQueryVariables>({ query: UptimeDocument, ...options })
}
export const AdminQueuesDocument = gql`
  query AdminQueues {
    items: adminQueues {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useAdminQueuesQuery(options?: Omit<Urql.UseQueryArgs<AdminQueuesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminQueuesQuery, AdminQueuesQueryVariables>({ query: AdminQueuesDocument, ...options })
}
export const AdminQueueDocument = gql`
  query AdminQueue($type: QueueType!) {
    item: adminQueue(type: $type) {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useAdminQueueQuery(options: Omit<Urql.UseQueryArgs<AdminQueueQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminQueueQuery, AdminQueueQueryVariables>({ query: AdminQueueDocument, ...options })
}
export const AdminQueueJobsDocument = gql`
  query AdminQueueJobs($type: QueueType!, $statuses: [JobStatus!]!) {
    items: adminQueueJobs(type: $type, statuses: $statuses) {
      ...JobDetails
    }
  }
  ${JobDetailsFragmentDoc}
`

export function useAdminQueueJobsQuery(options: Omit<Urql.UseQueryArgs<AdminQueueJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminQueueJobsQuery, AdminQueueJobsQueryVariables>({ query: AdminQueueJobsDocument, ...options })
}
export const AdminQueueLoadDocument = gql`
  mutation AdminQueueLoad($input: AdminQueueLoadInput!) {
    loaded: adminQueueLoad(input: $input) {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useAdminQueueLoadMutation() {
  return Urql.useMutation<AdminQueueLoadMutation, AdminQueueLoadMutationVariables>(AdminQueueLoadDocument)
}
export const AdminQueueCleanDocument = gql`
  mutation AdminQueueClean($type: QueueType!, $status: JobStatus) {
    paused: adminQueueClean(type: $type, status: $status)
  }
`

export function useAdminQueueCleanMutation() {
  return Urql.useMutation<AdminQueueCleanMutation, AdminQueueCleanMutationVariables>(AdminQueueCleanDocument)
}
export const AdminQueueDeleteJobDocument = gql`
  mutation AdminQueueDeleteJob($type: QueueType!, $jobId: String!) {
    paused: adminQueueDeleteJob(type: $type, jobId: $jobId)
  }
`

export function useAdminQueueDeleteJobMutation() {
  return Urql.useMutation<AdminQueueDeleteJobMutation, AdminQueueDeleteJobMutationVariables>(
    AdminQueueDeleteJobDocument,
  )
}
export const AdminQueuePauseDocument = gql`
  mutation AdminQueuePause($type: QueueType!) {
    paused: adminQueuePause(type: $type)
  }
`

export function useAdminQueuePauseMutation() {
  return Urql.useMutation<AdminQueuePauseMutation, AdminQueuePauseMutationVariables>(AdminQueuePauseDocument)
}
export const AdminQueueResumeDocument = gql`
  mutation adminQueueResume($type: QueueType!) {
    resumed: adminQueueResume(type: $type)
  }
`

export function useAdminQueueResumeMutation() {
  return Urql.useMutation<AdminQueueResumeMutation, AdminQueueResumeMutationVariables>(AdminQueueResumeDocument)
}
export const AdminCreateUserDocument = gql`
  mutation AdminCreateUser($input: AdminUserCreateInput!) {
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
  mutation AdminUpdateUser($userId: String!, $input: AdminUserUpdateInput!) {
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
  return Urql.useQuery<AdminUserQuery, AdminUserQueryVariables>({ query: AdminUserDocument, ...options })
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
  return Urql.useQuery<AdminUsersQuery, AdminUsersQueryVariables>({ query: AdminUsersDocument, ...options })
}
export const UserSearchUsersDocument = gql`
  query UserSearchUsers($input: UserSearchUserInput!) {
    items: userSearchUsers(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserSearchUsersQuery(options: Omit<Urql.UseQueryArgs<UserSearchUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UserSearchUsersQuery, UserSearchUsersQueryVariables>({
    query: UserSearchUsersDocument,
    ...options,
  })
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
  return Urql.useQuery<AdminWalletQuery, AdminWalletQueryVariables>({ query: AdminWalletDocument, ...options })
}
export const AdminWalletsDocument = gql`
  query AdminWallets {
    items: adminWallets {
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

export function useAdminWalletsQuery(options?: Omit<Urql.UseQueryArgs<AdminWalletsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminWalletsQuery, AdminWalletsQueryVariables>({ query: AdminWalletsDocument, ...options })
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
  mutation UserImportWallet($appEnvId: String!, $secret: String!) {
    generated: userImportWallet(appEnvId: $appEnvId, secret: $secret) {
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
  return Urql.useQuery<UserWalletQuery, UserWalletQueryVariables>({ query: UserWalletDocument, ...options })
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
  return Urql.useQuery<UserWalletAirdropQuery, UserWalletAirdropQueryVariables>({
    query: UserWalletAirdropDocument,
    ...options,
  })
}
export const UserWalletBalanceDocument = gql`
  query UserWalletBalance($appEnvId: String!, $walletId: String!) {
    balance: userWalletBalance(appEnvId: $appEnvId, walletId: $walletId)
  }
`

export function useUserWalletBalanceQuery(options: Omit<Urql.UseQueryArgs<UserWalletBalanceQueryVariables>, 'query'>) {
  return Urql.useQuery<UserWalletBalanceQuery, UserWalletBalanceQueryVariables>({
    query: UserWalletBalanceDocument,
    ...options,
  })
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
  return Urql.useQuery<UserWalletsQuery, UserWalletsQueryVariables>({ query: UserWalletsDocument, ...options })
}
