import { AppEnv } from '@kin-kinetic/shared/util/admin-sdk'
import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export interface UserAppEnvProviderContext {
  appEnv: AppEnv
  tabs: { label: string; path: string }[]
}

const AppEnvContext = React.createContext<UserAppEnvProviderContext>({} as UserAppEnvProviderContext)

function UserAppEnvProvider({ appEnv, children }: { children: ReactNode; appEnv: AppEnv }) {
  const tabs = [
    { path: `../overview`, label: 'Overview' },
    { path: `../transactions`, label: 'Transactions' },
    { path: `../wallets`, label: 'Wallets' },
    { path: `../settings`, label: 'Settings' },
  ]
  const value = {
    appEnv,
    tabs,
  }

  return <AppEnvContext.Provider value={value}>{children}</AppEnvContext.Provider>
}

const useUserAppEnv = () => React.useContext(AppEnvContext)

export { UserAppEnvProvider, useUserAppEnv }
