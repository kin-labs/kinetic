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
  id: Scalars['String']
  index: Scalars['Int']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  users?: Maybe<Array<AppUser>>
  wallet?: Maybe<Wallet>
  webhookEventUrl?: Maybe<Scalars['String']>
  webhookSecret?: Maybe<Scalars['String']>
  webhookVerifyUrl?: Maybe<Scalars['String']>
}

export type AppCreateInput = {
  index: Scalars['Int']
  name: Scalars['String']
  skipWalletCreation?: InputMaybe<Scalars['Boolean']>
}

export type AppCreation = {
  __typename?: 'AppCreation'
  createdAt: Scalars['DateTime']
  errors: Scalars['JSON']
  feePayer: Scalars['String']
  id: Scalars['String']
  mint: Scalars['String']
  processingDuration?: Maybe<Scalars['Int']>
  signature: Scalars['String']
  solanaDuration?: Maybe<Scalars['Int']>
  solanaEnd: Scalars['DateTime']
  solanaStart: Scalars['DateTime']
  source: Scalars['String']
  status: AppCreationStatus
  totalDuration?: Maybe<Scalars['Int']>
  updatedAt: Scalars['DateTime']
}

export enum AppCreationStatus {
  Failed = 'Failed',
  Pending = 'Pending',
  Succeed = 'Succeed',
}

export type AppPayment = {
  __typename?: 'AppPayment'
  amount?: Maybe<Scalars['Int']>
  createdAt?: Maybe<Scalars['DateTime']>
  destination?: Maybe<Scalars['String']>
  errors?: Maybe<Scalars['JSON']>
  feePayer?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  mint?: Maybe<Scalars['String']>
  processingDuration?: Maybe<Scalars['Int']>
  signature?: Maybe<Scalars['String']>
  solanaDuration?: Maybe<Scalars['Int']>
  solanaEnd?: Maybe<Scalars['DateTime']>
  solanaStart?: Maybe<Scalars['DateTime']>
  source?: Maybe<Scalars['String']>
  status: AppPaymentStatus
  totalDuration?: Maybe<Scalars['Int']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export enum AppPaymentStatus {
  Failed = 'Failed',
  Pending = 'Pending',
  Succeed = 'Succeed',
}

export type AppUpdateInput = {
  name?: InputMaybe<Scalars['String']>
  webhookEventUrl?: InputMaybe<Scalars['String']>
  webhookSecret?: InputMaybe<Scalars['String']>
  webhookVerifyUrl?: InputMaybe<Scalars['String']>
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

export type AppWebhookIncoming = {
  __typename?: 'AppWebhookIncoming'
  createdAt: Scalars['DateTime']
  headers: Scalars['JSON']
  id: Scalars['String']
  payload: Scalars['JSON']
  type: AppWebhookType
  updatedAt: Scalars['DateTime']
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

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  appUserAdd?: Maybe<App>
  appUserRemove?: Maybe<App>
  appUserUpdateRole?: Maybe<App>
  appWalletAdd?: Maybe<App>
  appWalletRemove?: Maybe<App>
  createApp?: Maybe<App>
  createUser?: Maybe<User>
  deleteApp?: Maybe<App>
  deleteUser?: Maybe<User>
  deleteWallet?: Maybe<Wallet>
  generateWallet?: Maybe<Wallet>
  login?: Maybe<AuthToken>
  logout?: Maybe<Scalars['Boolean']>
  updateApp?: Maybe<App>
  updateUser?: Maybe<User>
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

export type MutationAppWalletAddArgs = {
  appId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationAppWalletRemoveArgs = {
  appId: Scalars['String']
  walletId: Scalars['String']
}

export type MutationCreateAppArgs = {
  input: AppCreateInput
}

export type MutationCreateUserArgs = {
  input: UserCreateInput
}

export type MutationDeleteAppArgs = {
  appId: Scalars['String']
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

export type MutationUpdateUserArgs = {
  input: UserUpdateInput
  userId: Scalars['String']
}

export type NetworkStat = {
  __typename?: 'NetworkStat'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  numSlots?: Maybe<Scalars['Float']>
  numTransactions: Scalars['Float']
  samplePeriodSecs: Scalars['Float']
  slot: Scalars['Float']
  updatedAt: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  app?: Maybe<App>
  appCreation?: Maybe<AppCreation>
  appCreations?: Maybe<Array<AppCreation>>
  appPayment?: Maybe<AppPayment>
  appPayments?: Maybe<Array<AppPayment>>
  appWebhookIncoming?: Maybe<AppWebhookIncoming>
  appWebhooksIncoming?: Maybe<Array<AppWebhookIncoming>>
  apps?: Maybe<Array<App>>
  me?: Maybe<User>
  networkStat?: Maybe<NetworkStat>
  networkStats?: Maybe<Array<NetworkStat>>
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

export type QueryAppCreationArgs = {
  appCreationId: Scalars['String']
  appId: Scalars['String']
}

export type QueryAppCreationsArgs = {
  appId: Scalars['String']
}

export type QueryAppPaymentArgs = {
  appId: Scalars['String']
  appPaymentId: Scalars['String']
}

export type QueryAppPaymentsArgs = {
  appId: Scalars['String']
}

export type QueryAppWebhookIncomingArgs = {
  appId: Scalars['String']
  appWebhookIncomingId: Scalars['String']
}

export type QueryAppWebhooksIncomingArgs = {
  appId: Scalars['String']
}

export type QueryNetworkStatArgs = {
  networkStatId: Scalars['String']
}

export type QueryUserArgs = {
  userId: Scalars['String']
}

export type QueryWalletArgs = {
  walletId: Scalars['String']
}

export type QueryWalletAirdropArgs = {
  amount: Scalars['Float']
  walletId: Scalars['String']
}

export type QueryWalletBalanceArgs = {
  walletId: Scalars['String']
}

export type QueryWalletBalancesArgs = {
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
  id?: Maybe<Scalars['String']>
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
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type AppDetailsFragment = {
  __typename?: 'App'
  id: string
  createdAt: any
  updatedAt: any
  index: number
  name?: string | null
  webhookEventUrl?: string | null
  webhookSecret?: string | null
  webhookVerifyUrl?: string | null
}

export type AppCreationDetailsFragment = {
  __typename?: 'AppCreation'
  id: string
  createdAt: any
  updatedAt: any
  errors: any
  feePayer: string
  mint: string
  signature: string
  processingDuration?: number | null
  solanaDuration?: number | null
  solanaEnd: any
  solanaStart: any
  source: string
  status: AppCreationStatus
  totalDuration?: number | null
}

export type AppPaymentDetailsFragment = {
  __typename?: 'AppPayment'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  amount?: number | null
  destination?: string | null
  errors?: any | null
  feePayer?: string | null
  mint?: string | null
  processingDuration?: number | null
  signature?: string | null
  solanaDuration?: number | null
  solanaEnd?: any | null
  solanaStart?: any | null
  source?: string | null
  status: AppPaymentStatus
  totalDuration?: number | null
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
    name?: string | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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

export type AppWebhookIncomingDetailsFragment = {
  __typename?: 'AppWebhookIncoming'
  id: string
  createdAt: any
  updatedAt: any
  headers: any
  payload: any
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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
    wallet?: {
      __typename?: 'Wallet'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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
    wallet?: {
      __typename?: 'Wallet'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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

export type AppWalletAddMutationVariables = Exact<{
  appId: Scalars['String']
  walletId: Scalars['String']
}>

export type AppWalletAddMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
    wallet?: {
      __typename?: 'Wallet'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
  } | null
}

export type AppWalletRemoveMutationVariables = Exact<{
  appId: Scalars['String']
  walletId: Scalars['String']
}>

export type AppWalletRemoveMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'App'
    id: string
    createdAt: any
    updatedAt: any
    index: number
    name?: string | null
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
    wallet?: {
      __typename?: 'Wallet'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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
    wallet?: {
      __typename?: 'Wallet'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
  } | null
}

export type AppCreationQueryVariables = Exact<{
  appId: Scalars['String']
  appCreationId: Scalars['String']
}>

export type AppCreationQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppCreation'
    id: string
    createdAt: any
    updatedAt: any
    errors: any
    feePayer: string
    mint: string
    signature: string
    processingDuration?: number | null
    solanaDuration?: number | null
    solanaEnd: any
    solanaStart: any
    source: string
    status: AppCreationStatus
    totalDuration?: number | null
  } | null
}

export type AppCreationsQueryVariables = Exact<{
  appId: Scalars['String']
}>

export type AppCreationsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'AppCreation'
    id: string
    createdAt: any
    updatedAt: any
    errors: any
    feePayer: string
    mint: string
    signature: string
    processingDuration?: number | null
    solanaDuration?: number | null
    solanaEnd: any
    solanaStart: any
    source: string
    status: AppCreationStatus
    totalDuration?: number | null
  }> | null
}

export type AppPaymentQueryVariables = Exact<{
  appId: Scalars['String']
  appPaymentId: Scalars['String']
}>

export type AppPaymentQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppPayment'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: number | null
    destination?: string | null
    errors?: any | null
    feePayer?: string | null
    mint?: string | null
    processingDuration?: number | null
    signature?: string | null
    solanaDuration?: number | null
    solanaEnd?: any | null
    solanaStart?: any | null
    source?: string | null
    status: AppPaymentStatus
    totalDuration?: number | null
  } | null
}

export type AppPaymentsQueryVariables = Exact<{
  appId: Scalars['String']
}>

export type AppPaymentsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'AppPayment'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    amount?: number | null
    destination?: string | null
    errors?: any | null
    feePayer?: string | null
    mint?: string | null
    processingDuration?: number | null
    signature?: string | null
    solanaDuration?: number | null
    solanaEnd?: any | null
    solanaStart?: any | null
    source?: string | null
    status: AppPaymentStatus
    totalDuration?: number | null
  }> | null
}

export type AppWebhookIncomingQueryVariables = Exact<{
  appId: Scalars['String']
  appWebhookIncomingId: Scalars['String']
}>

export type AppWebhookIncomingQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'AppWebhookIncoming'
    id: string
    createdAt: any
    updatedAt: any
    headers: any
    payload: any
    type: AppWebhookType
  } | null
}

export type AppWebhooksIncomingQueryVariables = Exact<{
  appId: Scalars['String']
}>

export type AppWebhooksIncomingQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'AppWebhookIncoming'
    id: string
    createdAt: any
    updatedAt: any
    headers: any
    payload: any
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
    webhookEventUrl?: string | null
    webhookSecret?: string | null
    webhookVerifyUrl?: string | null
    wallet?: {
      __typename?: 'Wallet'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      publicKey?: string | null
    } | null
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
        webhookEventUrl?: string | null
        webhookSecret?: string | null
        webhookVerifyUrl?: string | null
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
  id?: string | null
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
}

export type GenerateWalletMutationVariables = Exact<{
  index: Scalars['Int']
}>

export type GenerateWalletMutation = {
  __typename?: 'Mutation'
  generated?: {
    __typename?: 'Wallet'
    id?: string | null
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
    id?: string | null
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
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  } | null
}

export type WalletAirdropQueryVariables = Exact<{
  walletId: Scalars['String']
  amount: Scalars['Float']
}>

export type WalletAirdropQuery = {
  __typename?: 'Query'
  response?: { __typename?: 'WalletAirdropResponse'; signature?: string | null } | null
}

export type WalletBalanceQueryVariables = Exact<{
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
  } | null
}

export type WalletBalancesQueryVariables = Exact<{
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
  }> | null
}

export type WalletsQueryVariables = Exact<{ [key: string]: never }>

export type WalletsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Wallet'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    publicKey?: string | null
  }> | null
}

export const AppCreationDetailsFragmentDoc = gql`
  fragment AppCreationDetails on AppCreation {
    id
    createdAt
    updatedAt
    errors
    feePayer
    mint
    signature
    processingDuration
    solanaDuration
    solanaEnd
    solanaStart
    source
    status
    totalDuration
  }
`
export const AppPaymentDetailsFragmentDoc = gql`
  fragment AppPaymentDetails on AppPayment {
    id
    createdAt
    updatedAt
    amount
    destination
    errors
    feePayer
    mint
    processingDuration
    signature
    solanaDuration
    solanaEnd
    solanaStart
    source
    status
    totalDuration
  }
`
export const AppDetailsFragmentDoc = gql`
  fragment AppDetails on App {
    id
    createdAt
    updatedAt
    index
    name
    webhookEventUrl
    webhookSecret
    webhookVerifyUrl
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
export const AppWebhookIncomingDetailsFragmentDoc = gql`
  fragment AppWebhookIncomingDetails on AppWebhookIncoming {
    id
    createdAt
    updatedAt
    headers
    payload
    type
  }
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
export const UserEmailDetailsFragmentDoc = gql`
  fragment UserEmailDetails on UserEmail {
    id
    createdAt
    updatedAt
    email
  }
`
export const WalletDetailsFragmentDoc = gql`
  fragment WalletDetails on Wallet {
    id
    createdAt
    updatedAt
    publicKey
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
  }
`
export const CreateAppDocument = gql`
  mutation CreateApp($input: AppCreateInput!) {
    created: createApp(input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
      wallet {
        ...WalletDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useCreateAppMutation() {
  return Urql.useMutation<CreateAppMutation, CreateAppMutationVariables>(CreateAppDocument)
}
export const DeleteAppDocument = gql`
  mutation DeleteApp($appId: String!) {
    deleted: deleteApp(appId: $appId) {
      ...AppDetails
    }
  }
  ${AppDetailsFragmentDoc}
`

export function useDeleteAppMutation() {
  return Urql.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(DeleteAppDocument)
}
export const UpdateAppDocument = gql`
  mutation UpdateApp($appId: String!, $input: AppUpdateInput!) {
    updated: updateApp(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
      wallet {
        ...WalletDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useUpdateAppMutation() {
  return Urql.useMutation<UpdateAppMutation, UpdateAppMutationVariables>(UpdateAppDocument)
}
export const AppUserAddDocument = gql`
  mutation AppUserAdd($appId: String!, $input: AppUserAddInput!) {
    item: appUserAdd(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useAppUserAddMutation() {
  return Urql.useMutation<AppUserAddMutation, AppUserAddMutationVariables>(AppUserAddDocument)
}
export const AppUserRemoveDocument = gql`
  mutation AppUserRemove($appId: String!, $input: AppUserRemoveInput!) {
    item: appUserRemove(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useAppUserRemoveMutation() {
  return Urql.useMutation<AppUserRemoveMutation, AppUserRemoveMutationVariables>(AppUserRemoveDocument)
}
export const AppUserUpdateRoleDocument = gql`
  mutation AppUserUpdateRole($appId: String!, $input: AppUserUpdateRoleInput!) {
    item: appUserUpdateRole(appId: $appId, input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
`

export function useAppUserUpdateRoleMutation() {
  return Urql.useMutation<AppUserUpdateRoleMutation, AppUserUpdateRoleMutationVariables>(AppUserUpdateRoleDocument)
}
export const AppWalletAddDocument = gql`
  mutation AppWalletAdd($appId: String!, $walletId: String!) {
    item: appWalletAdd(appId: $appId, walletId: $walletId) {
      ...AppDetails
      wallet {
        ...WalletDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useAppWalletAddMutation() {
  return Urql.useMutation<AppWalletAddMutation, AppWalletAddMutationVariables>(AppWalletAddDocument)
}
export const AppWalletRemoveDocument = gql`
  mutation AppWalletRemove($appId: String!, $walletId: String!) {
    item: appWalletRemove(appId: $appId, walletId: $walletId) {
      ...AppDetails
      wallet {
        ...WalletDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useAppWalletRemoveMutation() {
  return Urql.useMutation<AppWalletRemoveMutation, AppWalletRemoveMutationVariables>(AppWalletRemoveDocument)
}
export const AppDocument = gql`
  query App($appId: String!) {
    item: app(appId: $appId) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
      wallet {
        ...WalletDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useAppQuery(options: Omit<Urql.UseQueryArgs<AppQueryVariables>, 'query'>) {
  return Urql.useQuery<AppQuery>({ query: AppDocument, ...options })
}
export const AppCreationDocument = gql`
  query AppCreation($appId: String!, $appCreationId: String!) {
    item: appCreation(appId: $appId, appCreationId: $appCreationId) {
      ...AppCreationDetails
    }
  }
  ${AppCreationDetailsFragmentDoc}
`

export function useAppCreationQuery(options: Omit<Urql.UseQueryArgs<AppCreationQueryVariables>, 'query'>) {
  return Urql.useQuery<AppCreationQuery>({ query: AppCreationDocument, ...options })
}
export const AppCreationsDocument = gql`
  query AppCreations($appId: String!) {
    items: appCreations(appId: $appId) {
      ...AppCreationDetails
    }
  }
  ${AppCreationDetailsFragmentDoc}
`

export function useAppCreationsQuery(options: Omit<Urql.UseQueryArgs<AppCreationsQueryVariables>, 'query'>) {
  return Urql.useQuery<AppCreationsQuery>({ query: AppCreationsDocument, ...options })
}
export const AppPaymentDocument = gql`
  query AppPayment($appId: String!, $appPaymentId: String!) {
    item: appPayment(appId: $appId, appPaymentId: $appPaymentId) {
      ...AppPaymentDetails
    }
  }
  ${AppPaymentDetailsFragmentDoc}
`

export function useAppPaymentQuery(options: Omit<Urql.UseQueryArgs<AppPaymentQueryVariables>, 'query'>) {
  return Urql.useQuery<AppPaymentQuery>({ query: AppPaymentDocument, ...options })
}
export const AppPaymentsDocument = gql`
  query AppPayments($appId: String!) {
    items: appPayments(appId: $appId) {
      ...AppPaymentDetails
    }
  }
  ${AppPaymentDetailsFragmentDoc}
`

export function useAppPaymentsQuery(options: Omit<Urql.UseQueryArgs<AppPaymentsQueryVariables>, 'query'>) {
  return Urql.useQuery<AppPaymentsQuery>({ query: AppPaymentsDocument, ...options })
}
export const AppWebhookIncomingDocument = gql`
  query AppWebhookIncoming($appId: String!, $appWebhookIncomingId: String!) {
    item: appWebhookIncoming(appId: $appId, appWebhookIncomingId: $appWebhookIncomingId) {
      ...AppWebhookIncomingDetails
    }
  }
  ${AppWebhookIncomingDetailsFragmentDoc}
`

export function useAppWebhookIncomingQuery(
  options: Omit<Urql.UseQueryArgs<AppWebhookIncomingQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AppWebhookIncomingQuery>({ query: AppWebhookIncomingDocument, ...options })
}
export const AppWebhooksIncomingDocument = gql`
  query AppWebhooksIncoming($appId: String!) {
    items: appWebhooksIncoming(appId: $appId) {
      ...AppWebhookIncomingDetails
    }
  }
  ${AppWebhookIncomingDetailsFragmentDoc}
`

export function useAppWebhooksIncomingQuery(
  options: Omit<Urql.UseQueryArgs<AppWebhooksIncomingQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AppWebhooksIncomingQuery>({ query: AppWebhooksIncomingDocument, ...options })
}
export const AppsDocument = gql`
  query Apps {
    items: apps {
      ...AppDetails
      wallet {
        ...WalletDetails
      }
    }
  }
  ${AppDetailsFragmentDoc}
  ${WalletDetailsFragmentDoc}
`

export function useAppsQuery(options?: Omit<Urql.UseQueryArgs<AppsQueryVariables>, 'query'>) {
  return Urql.useQuery<AppsQuery>({ query: AppsDocument, ...options })
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
export const UptimeDocument = gql`
  query Uptime {
    uptime
  }
`

export function useUptimeQuery(options?: Omit<Urql.UseQueryArgs<UptimeQueryVariables>, 'query'>) {
  return Urql.useQuery<UptimeQuery>({ query: UptimeDocument, ...options })
}
export const CreateUserDocument = gql`
  mutation CreateUser($input: UserCreateInput!) {
    created: createUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument)
}
export const DeleteUserDocument = gql`
  mutation DeleteUser($userId: String!) {
    deleted: deleteUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument)
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($userId: String!, $input: UserUpdateInput!) {
    updated: updateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument)
}
export const UserDocument = gql`
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
  ${UserDetailsFragmentDoc}
  ${AppUserDetailsFragmentDoc}
  ${UserEmailDetailsFragmentDoc}
`

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options })
}
export const UsersDocument = gql`
  query Users {
    items: users {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options })
}
export const GenerateWalletDocument = gql`
  mutation GenerateWallet($index: Int!) {
    generated: generateWallet(index: $index) {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useGenerateWalletMutation() {
  return Urql.useMutation<GenerateWalletMutation, GenerateWalletMutationVariables>(GenerateWalletDocument)
}
export const DeleteWalletDocument = gql`
  mutation DeleteWallet($walletId: String!) {
    deleted: deleteWallet(walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useDeleteWalletMutation() {
  return Urql.useMutation<DeleteWalletMutation, DeleteWalletMutationVariables>(DeleteWalletDocument)
}
export const WalletDocument = gql`
  query Wallet($walletId: String!) {
    item: wallet(walletId: $walletId) {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useWalletQuery(options: Omit<Urql.UseQueryArgs<WalletQueryVariables>, 'query'>) {
  return Urql.useQuery<WalletQuery>({ query: WalletDocument, ...options })
}
export const WalletAirdropDocument = gql`
  query WalletAirdrop($walletId: String!, $amount: Float!) {
    response: walletAirdrop(walletId: $walletId, amount: $amount) {
      ...WalletAirdropResponseDetails
    }
  }
  ${WalletAirdropResponseDetailsFragmentDoc}
`

export function useWalletAirdropQuery(options: Omit<Urql.UseQueryArgs<WalletAirdropQueryVariables>, 'query'>) {
  return Urql.useQuery<WalletAirdropQuery>({ query: WalletAirdropDocument, ...options })
}
export const WalletBalanceDocument = gql`
  query WalletBalance($walletId: String!) {
    balance: walletBalance(walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetailsFragmentDoc}
`

export function useWalletBalanceQuery(options: Omit<Urql.UseQueryArgs<WalletBalanceQueryVariables>, 'query'>) {
  return Urql.useQuery<WalletBalanceQuery>({ query: WalletBalanceDocument, ...options })
}
export const WalletBalancesDocument = gql`
  query WalletBalances($walletId: String!) {
    balances: walletBalances(walletId: $walletId) {
      ...WalletBalanceDetails
    }
  }
  ${WalletBalanceDetailsFragmentDoc}
`

export function useWalletBalancesQuery(options: Omit<Urql.UseQueryArgs<WalletBalancesQueryVariables>, 'query'>) {
  return Urql.useQuery<WalletBalancesQuery>({ query: WalletBalancesDocument, ...options })
}
export const WalletsDocument = gql`
  query Wallets {
    items: wallets {
      ...WalletDetails
    }
  }
  ${WalletDetailsFragmentDoc}
`

export function useWalletsQuery(options?: Omit<Urql.UseQueryArgs<WalletsQueryVariables>, 'query'>) {
  return Urql.useQuery<WalletsQuery>({ query: WalletsDocument, ...options })
}
