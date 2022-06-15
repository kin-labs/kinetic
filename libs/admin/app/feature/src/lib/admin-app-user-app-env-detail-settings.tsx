import { useUserAppEnv } from '@kin-kinetic/admin/app/data-access'
import React from 'react'
import { AdminAppUserEnvSettingsTab } from './admin-app-user-env-settings-tab'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailSettings() {
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && <AdminAppUserEnvSettingsTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </AdminAppUserAppEnvDetailLayout>
  )
}
