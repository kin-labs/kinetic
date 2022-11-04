import { useToast } from '@chakra-ui/react'
import { useWebUiLayout } from '@kin-kinetic/web/ui/layout'
import { App, useUserAppsQuery } from '@kin-kinetic/web/util/sdk'
import { createContext, ReactNode, useContext, useEffect } from 'react'

export interface WebAppsProviderContext {
  app: App | undefined
  apps: App[]
  loading: boolean
  setApp: (app: App | undefined) => void
}

const WebAppsContext = createContext<WebAppsProviderContext>({} as WebAppsProviderContext)

function WebAppsProvider({ children }: { children: ReactNode }) {
  const toast = useToast()
  const [{ data, error, fetching }] = useUserAppsQuery()
  const { apps, app, setApp, setApps } = useWebUiLayout()

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: `Error loading apps...`,
        description: `${error}`,
      })
    }
  }, [error])

  useEffect(() => {
    if (!data?.items) return

    setApps(data?.items || [])
  }, [data?.items])

  const value: WebAppsProviderContext = {
    apps: apps ?? [],
    app,
    loading: fetching,
    setApp,
  }
  return <WebAppsContext.Provider value={value}>{children}</WebAppsContext.Provider>
}

const useWebApps = () => useContext(WebAppsContext)

export { WebAppsProvider, useWebApps }
