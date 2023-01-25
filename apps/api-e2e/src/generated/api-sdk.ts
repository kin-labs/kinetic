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

export const ClusterDetails = gql`
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
export const MintDetails = gql`
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
export const WalletDetails = gql`
  fragment WalletDetails on Wallet {
    id
    createdAt
    updatedAt
    publicKey
    type
  }
`
export const AppMintDetails = gql`
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
  ${MintDetails}
  ${WalletDetails}
`
export const AppEnvDetails = gql`
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
  ${ClusterDetails}
  ${MintDetails}
  ${AppMintDetails}
`
export const AppEnvTransactionCountDetails = gql`
  fragment AppEnvTransactionCountDetails on AppEnvTransactionCount {
    Committed
    Confirmed
    Failed
    Finalized
    Processing
  }
`
export const AppEnvStatsDetails = gql`
  fragment AppEnvStatsDetails on AppEnvStats {
    transactionCount {
      ...AppEnvTransactionCountDetails
    }
  }
  ${AppEnvTransactionCountDetails}
`
export const TransactionErrorDetails = gql`
  fragment TransactionErrorDetails on TransactionError {
    id
    logs
    message
    type
    instruction
  }
`
export const WebhookDetails = gql`
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
export const TransactionDetails = gql`
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
  ${TransactionErrorDetails}
  ${WebhookDetails}
`
export const AppDetails = gql`
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
export const QueueCountDetails = gql`
  fragment QueueCountDetails on QueueCount {
    active
    completed
    delayed
    failed
    paused
    waiting
  }
`
export const QueueDetails = gql`
  fragment QueueDetails on Queue {
    type
    name
    count {
      ...QueueCountDetails
    }
    info
    isPaused
  }
  ${QueueCountDetails}
`
export const JobDetails = gql`
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
export const AdminCreateApp = gql`
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const AdminUpdateApp = gql`
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
export const AdminDeleteAppEnv = gql`
  mutation AdminDeleteAppEnv($appId: String!, $appEnvId: String!) {
    deleted: adminDeleteAppEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
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
export const UserAppEnvStats = gql`
  query UserAppEnvStats($appEnvId: String!) {
    stats: userAppEnvStats(appEnvId: $appEnvId) {
      ...AppEnvStatsDetails
    }
  }
  ${AppEnvStatsDetails}
`
export const UserUpdateApp = gql`
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
  ${AppDetails}
  ${AppEnvDetails}
  ${WalletDetails}
  ${AppUserDetails}
`
export const UserCreateAppEnv = gql`
  mutation UserCreateAppEnv($appId: String!, $clusterId: String!, $input: UserAppEnvCreateInput!) {
    created: userCreateAppEnv(appId: $appId, clusterId: $clusterId, input: $input) {
      ...AppEnvDetails
      wallets {
        ...WalletDetails
      }
    }
  }
  ${AppEnvDetails}
  ${WalletDetails}
`
export const UserUpdateAppEnv = gql`
  mutation UserUpdateAppEnv($appId: String!, $appEnvId: String!, $input: UserAppEnvUpdateInput!) {
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
export const UserUpdateAppMint = gql`
  mutation UserUpdateAppMint($appId: String!, $appMintId: String!, $input: UserAppMintUpdateInput!) {
    updated: userUpdateAppMint(appId: $appId, appMintId: $appMintId, input: $input) {
      ...AppMintDetails
    }
  }
  ${AppMintDetails}
`
export const UserAppUserAdd = gql`
  mutation UserAppUserAdd($appId: String!, $input: UserAppUserAddInput!) {
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
  mutation UserAppUserRemove($appId: String!, $input: UserAppUserRemoveInput!) {
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
  mutation UserAppUserUpdateRole($appId: String!, $input: UserAppUserUpdateRoleInput!) {
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
export const UserAppEnvAddAllowedIp = gql`
  mutation UserAppEnvAddAllowedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvAddAllowedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvRemoveAllowedIp = gql`
  mutation UserAppEnvRemoveAllowedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvRemoveAllowedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvAddBlockedIp = gql`
  mutation UserAppEnvAddBlockedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvAddBlockedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvRemoveBlockedIp = gql`
  mutation UserAppEnvRemoveBlockedIp($appEnvId: String!, $ip: String!) {
    item: userAppEnvRemoveBlockedIp(appEnvId: $appEnvId, ip: $ip) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvAddAllowedUa = gql`
  mutation UserAppEnvAddAllowedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvAddAllowedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvRemoveAllowedUa = gql`
  mutation UserAppEnvRemoveAllowedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvRemoveAllowedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvAddBlockedUa = gql`
  mutation UserAppEnvAddBlockedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvAddBlockedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvRemoveBlockedUa = gql`
  mutation UserAppEnvRemoveBlockedUa($appEnvId: String!, $ua: String!) {
    item: userAppEnvRemoveBlockedUa(appEnvId: $appEnvId, ua: $ua) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserAppEnvPurgeTransactions = gql`
  mutation UserAppEnvPurgeTransactions($appEnvId: String!, $status: TransactionStatus) {
    item: userAppEnvPurgeTransactions(appEnvId: $appEnvId, status: $status) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
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
  mutation UserAppEnvMintSetWallet($appId: String!, $appEnvId: String!, $mintId: String!, $walletId: String!) {
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
export const UserDeleteAppEnv = gql`
  mutation UserDeleteAppEnv($appId: String!, $appEnvId: String!) {
    item: userDeleteAppEnv(appId: $appId, appEnvId: $appEnvId) {
      ...AppEnvDetails
    }
  }
  ${AppEnvDetails}
`
export const UserTransaction = gql`
  query UserTransaction($appId: String!, $appEnvId: String!, $transactionId: String!) {
    item: userTransaction(appId: $appId, appEnvId: $appEnvId, transactionId: $transactionId) {
      ...TransactionDetails
    }
  }
  ${TransactionDetails}
`
export const UserTransactions = gql`
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
  ${TransactionDetails}
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
  mutation Login($input: UserLoginInput!) {
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
export const AdminMintCreate = gql`
  mutation AdminMintCreate($input: AdminMintCreateInput!) {
    adminMintCreate(input: $input) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const AdminDeleteMint = gql`
  mutation AdminDeleteMint($mintId: String!) {
    deleted: adminDeleteMint(mintId: $mintId) {
      ...MintDetails
    }
  }
  ${MintDetails}
`
export const AdminMintImportWallet = gql`
  mutation AdminMintImportWallet($mintId: String!, $secret: String!) {
    adminMintImportWallet(mintId: $mintId, secret: $secret) {
      ...MintDetails
    }
  }
  ${MintDetails}
`
export const AdminCreateCluster = gql`
  mutation AdminCreateCluster($input: AdminClusterCreateInput!) {
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
  mutation AdminUpdateCluster($clusterId: String!, $input: AdminClusterUpdateInput!) {
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
export const AdminClusters = gql`
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
  ${ClusterDetails}
  ${AppEnvDetails}
  ${MintDetails}
`
export const UserCluster = gql`
  query UserCluster($clusterId: String!) {
    item: userCluster(clusterId: $clusterId) {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const UserClusters = gql`
  query UserClusters {
    items: userClusters {
      ...ClusterDetails
      mints {
        ...MintDetails
      }
    }
  }
  ${ClusterDetails}
  ${MintDetails}
`
export const WebConfig = gql`
  query WebConfig {
    config: webConfig {
      discordEnabled
      githubEnabled
      googleEnabled
      passwordEnabled
    }
  }
`
export const Uptime = gql`
  query Uptime {
    uptime
  }
`
export const AdminQueues = gql`
  query AdminQueues {
    items: adminQueues {
      ...QueueDetails
    }
  }
  ${QueueDetails}
`
export const AdminQueue = gql`
  query AdminQueue($type: QueueType!) {
    item: adminQueue(type: $type) {
      ...QueueDetails
    }
  }
  ${QueueDetails}
`
export const AdminQueueJobs = gql`
  query AdminQueueJobs($type: QueueType!, $statuses: [JobStatus!]!) {
    items: adminQueueJobs(type: $type, statuses: $statuses) {
      ...JobDetails
    }
  }
  ${JobDetails}
`
export const AdminQueueLoad = gql`
  mutation AdminQueueLoad($input: AdminQueueLoadInput!) {
    loaded: adminQueueLoad(input: $input) {
      ...QueueDetails
    }
  }
  ${QueueDetails}
`
export const AdminQueueClean = gql`
  mutation AdminQueueClean($type: QueueType!, $status: JobStatus) {
    paused: adminQueueClean(type: $type, status: $status)
  }
`
export const AdminQueueDeleteJob = gql`
  mutation AdminQueueDeleteJob($type: QueueType!, $jobId: String!) {
    paused: adminQueueDeleteJob(type: $type, jobId: $jobId)
  }
`
export const AdminQueuePause = gql`
  mutation AdminQueuePause($type: QueueType!) {
    paused: adminQueuePause(type: $type)
  }
`
export const AdminQueueResume = gql`
  mutation adminQueueResume($type: QueueType!) {
    resumed: adminQueueResume(type: $type)
  }
`
export const AdminCreateUser = gql`
  mutation AdminCreateUser($input: AdminUserCreateInput!) {
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
  mutation AdminUpdateUser($userId: String!, $input: AdminUserUpdateInput!) {
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
export const UserSearchUsers = gql`
  query UserSearchUsers($input: UserSearchUserInput!) {
    items: userSearchUsers(input: $input) {
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
      owner {
        ...UserDetails
      }
    }
  }
  ${WalletDetails}
  ${AppEnvDetails}
  ${UserDetails}
`
export const AdminWallets = gql`
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
  ${WalletDetails}
  ${AppEnvDetails}
  ${UserDetails}
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
  mutation UserImportWallet($appEnvId: String!, $secret: String!) {
    generated: userImportWallet(appEnvId: $appEnvId, secret: $secret) {
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
    balance: userWalletBalance(appEnvId: $appEnvId, walletId: $walletId)
  }
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

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
