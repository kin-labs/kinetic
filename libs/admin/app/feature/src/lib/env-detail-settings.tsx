import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppEnvSettingsTab } from './app-env-settings-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailSettings() {
  const { appEnv } = useAppEnv()
  return (
    <EnvDetailLayout>
      {appEnv.app?.id && <AppEnvSettingsTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </EnvDetailLayout>
  )
}
