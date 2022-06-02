import { AppEnv } from '@mogami/shared/util/admin-sdk'
import React, { ReactNode } from 'react'

export interface AppEnvProviderContext {
  baseUrl: string
  env: AppEnv
  tabs: { label: string; path: string }[]
}

const AppEnvContext = React.createContext<AppEnvProviderContext>({} as AppEnvProviderContext)

function AppEnvProvider({ baseUrl, env, children }: { baseUrl: string; children: ReactNode; env: AppEnv }) {
  const tabs = [
    { path: `${baseUrl}`, label: 'Overview' },
    { path: `${baseUrl}/transactions`, label: 'Transactions' },
    { path: `${baseUrl}/wallets`, label: 'Wallets' },
    { path: `${baseUrl}/webhooks`, label: 'Webhooks' },
  ]
  const value = {
    baseUrl,
    env,
    tabs,
  }

  return <AppEnvContext.Provider value={value}>{children}</AppEnvContext.Provider>
}

const useAppEnv = () => React.useContext(AppEnvContext)

export { AppEnvProvider, useAppEnv }
