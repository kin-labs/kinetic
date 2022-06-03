import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppEnvSettingsTab } from './app-env-settings-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailSettings() {
  const { env } = useAppEnv()
  return <EnvDetailLayout>{env.app?.id && <AppEnvSettingsTab appId={env.app.id} envId={env.id} />}</EnvDetailLayout>
}
