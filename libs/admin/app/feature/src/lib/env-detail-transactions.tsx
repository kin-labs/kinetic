import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppTransactionsTab } from './app-transactions-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailTransactions() {
  const { env } = useAppEnv()
  return <EnvDetailLayout>{env.app?.id && <AppTransactionsTab appId={env.app.id} envId={env.id} />}</EnvDetailLayout>
}
