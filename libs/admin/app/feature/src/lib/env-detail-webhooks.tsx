import React from 'react'
import { useAppEnv } from './app-env-provider'
import { AppWebhooksTab } from './app-webhooks-tab'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWebhooks() {
  const { env } = useAppEnv()
  return <EnvDetailLayout>{env.app?.id && <AppWebhooksTab appId={env.app.id} envId={env.id} />}</EnvDetailLayout>
}
