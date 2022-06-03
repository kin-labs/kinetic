import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppFeatureWebhookDetail from './admin-app-feature-webhook-detail'
import { useAppEnv } from './app-env-provider'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWebhook() {
  const { appWebhookId } = useParams<{ appId: string; appWebhookId: string }>()
  const { appEnv } = useAppEnv()
  return (
    <EnvDetailLayout>
      {appEnv.app?.id && appWebhookId && (
        <AdminAppFeatureWebhookDetail appId={appEnv.app.id} appWebhookId={appWebhookId} />
      )}
    </EnvDetailLayout>
  )
}
