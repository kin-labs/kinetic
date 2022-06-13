import { useUserAppEnv } from '@mogami/admin/app/data-access'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'
import { AdminAppUserWalletTab } from './admin-app-user-wallet-tab'

export function AdminAppUserAppEnvDetailWallet() {
  const { walletId } = useParams<{ walletId: string }>()
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      {appEnv.app?.id && <AdminAppUserWalletTab appId={appEnv.app.id} appEnvId={appEnv.id} walletId={walletId} />}
    </AdminAppUserAppEnvDetailLayout>
  )
}
