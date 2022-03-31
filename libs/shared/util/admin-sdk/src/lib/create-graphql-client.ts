import { createClient } from 'urql'

export function createGraphqlClient() {
  return createClient({ url: '/graphql', requestPolicy: 'network-only' })
}
