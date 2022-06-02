import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppWalletsTab } from './app-wallets-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWallets() {
  const { env } = useAppEnv()
  return <EnvDetailLayout>{env.app?.id && <AppWalletsTab appId={env.app.id} />}</EnvDetailLayout>
}
