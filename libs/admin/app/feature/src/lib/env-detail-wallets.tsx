import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppWalletsTab } from './app-wallets-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWallets() {
  const { appEnv } = useAppEnv()
  return <EnvDetailLayout>{appEnv.app?.id && <AppWalletsTab appId={appEnv.app.id} />}</EnvDetailLayout>
}
