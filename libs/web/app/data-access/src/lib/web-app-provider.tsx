import { App, AppUserRole, useUserAppQuery } from '@kin-kinetic/web/util/sdk'
import { createContext, ReactNode, useContext } from 'react'

export interface WebAppProviderContext {
  app: App | null | undefined
  role: AppUserRole | null | undefined
  loading: boolean
}

const WebAppContext = createContext<WebAppProviderContext>({} as WebAppProviderContext)

function WebAppProvider({ appId, children }: { appId: string; children: ReactNode }) {
  const [{ data, fetching }] = useUserAppQuery({ variables: { appId } })

  const value: WebAppProviderContext = {
    app: data?.item,
    role: data?.role,
    loading: fetching,
  }
  return <WebAppContext.Provider value={value}>{children}</WebAppContext.Provider>
}

const useWebApp = () => useContext(WebAppContext)

export { WebAppProvider, useWebApp }
