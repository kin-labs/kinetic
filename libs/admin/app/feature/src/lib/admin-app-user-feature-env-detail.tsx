import { useToast } from '@chakra-ui/react'
import { UserAppEnvProvider } from '@kin-kinetic/admin/app/data-access'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useUserAppEnvQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AdminAppUserAppEnvDetailOverview } from './admin-app-user-app-env-detail-overview'
import { AdminAppUserAppEnvDetailSettings } from './admin-app-user-app-env-detail-settings'
import { AdminAppUserAppEnvDetailTransaction } from './admin-app-user-app-env-detail-transaction'
import { AdminAppUserAppEnvDetailTransactions } from './admin-app-user-app-env-detail-transactions'
import { AdminAppUserAppEnvDetailWallet } from './admin-app-user-app-env-detail-wallet'
import { AdminAppUserAppEnvDetailWallets } from './admin-app-user-app-env-detail-wallets'

export default function AdminAppUserFeatureEnvDetail() {
  const toast = useToast()
  const { appId, appEnvId } = useParams<{ appId: string; appEnvId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, error, fetching }] = useUserAppEnvQuery({ variables: { appId: appId!, appEnvId: appEnvId! } })

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      {data?.item ? (
        <UserAppEnvProvider appEnv={data.item}>
          <Routes>
            <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<AdminAppUserAppEnvDetailOverview />} />
            <Route path="settings" element={<AdminAppUserAppEnvDetailSettings />} />
            <Route path="transactions/:appTransactionId" element={<AdminAppUserAppEnvDetailTransaction />} />
            <Route path="transactions" element={<AdminAppUserAppEnvDetailTransactions />} />
            <Route path="wallets/:walletId" element={<AdminAppUserAppEnvDetailWallet />} />
            <Route path="wallets" element={<AdminAppUserAppEnvDetailWallets />} />
          </Routes>
        </UserAppEnvProvider>
      ) : (
        <AdminUiAlert status="warning" message={'App environment not found'} />
      )}
    </React.Suspense>
  )
}
