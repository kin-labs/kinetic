import { useUserAppEnv } from '@mogami/admin/app/data-access'
import React from 'react'
import { AdminAppUserWebhooksTab } from './admin-app-user-webhooks-tab'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailWebhooks() {
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && <AdminAppUserWebhooksTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </AdminAppUserAppEnvDetailLayout>
  )
}
