import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppWebhooksTab } from './app-webhooks-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWebhooks() {
  const { appEnv } = useAppEnv()
  return (
    <EnvDetailLayout>{appEnv.app?.id && <AppWebhooksTab appId={appEnv.app.id} appEnvId={appEnv.id} />}</EnvDetailLayout>
  )
}
