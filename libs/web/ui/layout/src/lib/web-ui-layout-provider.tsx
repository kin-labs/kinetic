import { App } from '@kin-kinetic/web/util/admin-sdk'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface WebUiLayoutProviderContext {
  app: App | undefined
  apps: App[] | undefined
  setApp: (app: App | undefined) => void
  setApps: (app: App[]) => void
}

const WebUiLayoutContext = createContext<WebUiLayoutProviderContext>({} as WebUiLayoutProviderContext)

function WebUiLayoutProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<App[] | undefined>()
  const [app, setApp] = useState<App | undefined>()

  const value: WebUiLayoutProviderContext = {
    app,
    apps,
    setApp,
    setApps,
  }
  return <WebUiLayoutContext.Provider value={value}>{children}</WebUiLayoutContext.Provider>
}

const useWebUiLayout = () => useContext(WebUiLayoutContext)

export { WebUiLayoutProvider, useWebUiLayout }
