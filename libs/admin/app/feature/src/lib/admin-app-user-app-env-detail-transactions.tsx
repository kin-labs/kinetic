import { useUserAppEnv } from '@mogami/admin/app/data-access'
import React from 'react'
import { AdminAppUserTransactionsTab } from './admin-app-user-transactions-tab'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailTransactions() {
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && <AdminAppUserTransactionsTab appId={appEnv.app.id} appEnvId={appEnv.id} />}
    </AdminAppUserAppEnvDetailLayout>
  )
}
