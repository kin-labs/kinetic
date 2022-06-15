import { useUserAppEnv } from '@kin-kinetic/admin/app/data-access'
import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppUserFeatureWebhookDetail from './admin-app-user-feature-webhook-detail'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailWebhook() {
  const { appWebhookId } = useParams<{ appId: string; appWebhookId: string }>()
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && appWebhookId && (
        <AdminAppUserFeatureWebhookDetail appId={appEnv.app.id} appWebhookId={appWebhookId} />
      )}
    </AdminAppUserAppEnvDetailLayout>
  )
}
