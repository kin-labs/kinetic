import { useUserAppEnv } from '@mogami/admin/app/data-access'
import React from 'react'
import { AdminAppUserWalletsTab } from './admin-app-user-wallets-tab'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailWallets() {
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && <AdminAppUserWalletsTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </AdminAppUserAppEnvDetailLayout>
  )
}
