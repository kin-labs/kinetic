import { AppEnv } from '@mogami/shared/util/admin-sdk'
import React, { ReactNode } from 'react'

export interface UserAppEnvProviderContext {
  baseUrl: string
  appEnv: AppEnv
  tabs: { label: string; path: string }[]
}

const AppEnvContext = React.createContext<UserAppEnvProviderContext>({} as UserAppEnvProviderContext)

function UserAppEnvProvider({ baseUrl, appEnv, children }: { baseUrl: string; children: ReactNode; appEnv: AppEnv }) {
  const tabs = [
    { path: `${baseUrl}/overview`, label: 'Overview' },
    { path: `${baseUrl}/transactions`, label: 'Transactions' },
    { path: `${baseUrl}/wallets`, label: 'Wallets' },
    { path: `${baseUrl}/webhooks`, label: 'Webhooks' },
    { path: `${baseUrl}/settings`, label: 'Settings' },
  ]
  const value = {
    baseUrl,
    appEnv,
    tabs,
  }

  return <AppEnvContext.Provider value={value}>{children}</AppEnvContext.Provider>
}

const useUserAppEnv = () => React.useContext(AppEnvContext)

export { UserAppEnvProvider, useUserAppEnv }
