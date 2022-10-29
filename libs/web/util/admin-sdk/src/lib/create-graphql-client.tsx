import { createClient } from 'urql'

export function createGraphqlClient(url: string) {
  return createClient({
    url,
    fetchOptions: {
      credentials: 'include',
      mode: 'cors',
    },
    requestPolicy: 'network-only',
  })
}
