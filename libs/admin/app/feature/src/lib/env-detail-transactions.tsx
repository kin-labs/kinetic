import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppTransactionsTab } from './app-transactions-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailTransactions() {
  const { appEnv } = useAppEnv()
  return (
    <EnvDetailLayout>
      {appEnv.app?.id && <AppTransactionsTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </EnvDetailLayout>
  )
}
