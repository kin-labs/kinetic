import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminWalletFeatureDetail = React.lazy(async () => import('./admin-wallet-feature-detail'))
const AdminWalletFeatureList = React.lazy(async () => import('./admin-wallet-feature-list'))

export function AdminWalletFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Routes>
        <Route index element={<AdminWalletFeatureList />} />
        <Route path=":walletId/*" element={<AdminWalletFeatureDetail />} />
      </Routes>
    </React.Suspense>
  )
}
