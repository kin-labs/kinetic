import { ReactNode } from 'react'
import { Provider } from 'urql'
import { createGraphqlClient } from './create-graphql-client'

export function GraphQLProvider({ children, endpoint }: { children: ReactNode; endpoint: string }) {
  const client = createGraphqlClient(endpoint)

  return <Provider value={client}>{children}</Provider>
}
