import { useUserAppEnv } from '@kin-kinetic/admin/app/data-access'
import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppUserFeatureTransactionDetail from './admin-app-user-feature-transaction-detail'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailTransaction() {
  const { transactionId } = useParams<{ appId: string; transactionId: string }>()
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.id && appEnv.app?.id && transactionId && (
        <AdminAppUserFeatureTransactionDetail
          appId={appEnv.app.id}
          appEnvId={appEnv.id}
          transactionId={transactionId}
        />
      )}
    </AdminAppUserAppEnvDetailLayout>
  )
}
