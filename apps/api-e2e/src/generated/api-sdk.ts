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
}

export type App = {
  __typename?: 'App'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  index: Scalars['Int']
  name?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  users?: Maybe<Array<AppUser>>
}

export type AppCreateInput = {
  index: Scalars['Int']
  name: Scalars['String']
}

export type AppUpdateInput = {
  name?: InputMaybe<Scalars['String']>
}

export type AppUser = {
  __typename?: 'AppUser'
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

export type AuthToken = {
  __typename?: 'AuthToken'
  token: Scalars['String']
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
  createApp?: Maybe<App>
  createUser?: Maybe<User>
  deleteApp?: Maybe<App>
  deleteUser?: Maybe<User>
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

export type Query = {
  __typename?: 'Query'
  app?: Maybe<App>
  apps?: Maybe<Array<App>>
  me?: Maybe<User>
  uptime: Scalars['Float']
  user?: Maybe<User>
  users?: Maybe<Array<User>>
}

export type QueryAppArgs = {
  appId: Scalars['String']
}

export type QueryUserArgs = {
  userId: Scalars['String']
}

export type User = {
  __typename?: 'User'
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
    user {
      ...UserDetails
    }
  }
  ${UserDetails}
`
export const AuthTokenDetails = gql`
  fragment AuthTokenDetails on AuthToken {
    token
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
export const CreateApp = gql`
  mutation CreateApp($input: AppCreateInput!) {
    created: createApp(input: $input) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
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
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
`
export const App = gql`
  query App($appId: String!) {
    item: app(appId: $appId) {
      ...AppDetails
      users {
        ...AppUserDetails
      }
    }
  }
  ${AppDetails}
  ${AppUserDetails}
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
export const Apps = gql`
  query Apps {
    items: apps {
      ...AppDetails
    }
  }
  ${AppDetails}
`
export const Login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...AuthTokenDetails
    }
  }
  ${AuthTokenDetails}
`
export const Me = gql`
  query Me {
    me {
      ...UserDetails
    }
  }
  ${UserDetails}
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
      emails {
        ...UserEmailDetails
      }
    }
  }
  ${UserDetails}
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
export type AppDetailsFragment = {
  __typename?: 'App'
  id: string
  createdAt: any
  updatedAt: any
  index: number
  name?: string | null
}

export type AppUserDetailsFragment = {
  __typename?: 'AppUser'
  id: string
  createdAt: any
  updatedAt: any
  role: AppUserRole
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
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
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
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
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
    users?: Array<{
      __typename?: 'AppUser'
      id: string
      createdAt: any
      updatedAt: any
      role: AppUserRole
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
  }> | null
}

export type AuthTokenDetailsFragment = { __typename?: 'AuthToken'; token: string }

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = { __typename?: 'Mutation'; login?: { __typename?: 'AuthToken'; token: string } | null }

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

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
