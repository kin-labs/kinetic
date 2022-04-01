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
  login?: Maybe<AuthToken>
  logout?: Maybe<Scalars['Boolean']>
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type Query = {
  __typename?: 'Query'
  me?: Maybe<User>
  uptime: Scalars['Float']
}

export type User = {
  __typename?: 'User'
  avatarUrl: Scalars['String']
  createdAt: Scalars['DateTime']
  emails?: Maybe<Array<UserEmail>>
  id: Scalars['String']
  name: Scalars['String']
  role?: Maybe<UserRole>
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
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

export const AuthTokenDetails = gql`
  fragment AuthTokenDetails on AuthToken {
    token
  }
`
export const UserDetails = gql`
  fragment UserDetails on User {
    id
    createdAt
    updatedAt
    avatarUrl
    name
    username
    role
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
    avatarUrl: string
    name: string
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
  avatarUrl: string
  name: string
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

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
