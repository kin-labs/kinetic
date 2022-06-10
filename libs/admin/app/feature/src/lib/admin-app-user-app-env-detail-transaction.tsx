import { useUserAppEnv } from '@mogami/admin/app/data-access'
import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppUserFeatureTransactionDetail from './admin-app-user-feature-transaction-detail'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailTransaction() {
  const { appTransactionId } = useParams<{ appId: string; appTransactionId: string }>()
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.id && appEnv.app?.id && appTransactionId && (
        <AdminAppUserFeatureTransactionDetail
          appId={appEnv.app.id}
          appEnvId={appEnv.id}
          appTransactionId={appTransactionId}
        />
      )}
    </AdminAppUserAppEnvDetailLayout>
  )
}
