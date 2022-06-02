import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppFeatureWebhookDetail from './admin-app-feature-webhook-detail'
import { useAppEnv } from './app-env-provider'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWebhook() {
  const { appWebhookId } = useParams<{ appId: string; appWebhookId: string }>()
  const { env } = useAppEnv()
  return (
    <EnvDetailLayout>
      {env.app?.id && appWebhookId && <AdminAppFeatureWebhookDetail appId={env.app.id} appWebhookId={appWebhookId} />}
    </EnvDetailLayout>
  )
}
