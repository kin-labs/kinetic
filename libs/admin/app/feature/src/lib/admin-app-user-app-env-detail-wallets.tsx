import { useUserAppEnv } from '@mogami/admin/app/data-access'
import React from 'react'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'
import { AdminAppUserWalletsTab } from './admin-app-user-wallets-tab'

export function AdminAppUserAppEnvDetailWallets() {
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && <AdminAppUserWalletsTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </AdminAppUserAppEnvDetailLayout>
  )
}
