import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppFeatureTransactionDetail from './admin-app-feature-transaction-detail'
import { useAppEnv } from './app-env-provider'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailTransaction() {
  const { appTransactionId } = useParams<{ appId: string; appTransactionId: string }>()
  const { env } = useAppEnv()
  return (
    <EnvDetailLayout>
      {env.app?.id && appTransactionId && (
        <AdminAppFeatureTransactionDetail appId={env.app.id} appTransactionId={appTransactionId} />
      )}
    </EnvDetailLayout>
  )
}
