import React from 'react'
import { useParams } from 'react-router-dom'
import AdminAppFeatureTransactionDetail from './admin-app-feature-transaction-detail'
import { useAppEnv } from './app-env-provider'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailTransaction() {
  const { appTransactionId } = useParams<{ appId: string; appTransactionId: string }>()
  const { appEnv } = useAppEnv()
  return (
    <EnvDetailLayout>
      {appEnv.id && appEnv.app?.id && appTransactionId && (
        <AdminAppFeatureTransactionDetail
          appId={appEnv.app.id}
          appEnvId={appEnv.id}
          appTransactionId={appTransactionId}
        />
      )}
    </EnvDetailLayout>
  )
}
