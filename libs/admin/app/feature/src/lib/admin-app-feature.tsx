import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminAppFeatureTransactionDetail from './admin-app-feature-transaction-detail'
import AdminAppFeatureWebhookDetail from './admin-app-feature-webhook-detail'

const AdminAppFeatureDetail = React.lazy(async () => import('./admin-app-feature-detail'))
const AdminAppFeatureList = React.lazy(async () => import('./admin-app-feature-list'))

export function AdminAppFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Routes>
        <Route path="" element={<AdminAppFeatureList />} />
        <Route path=":appId" element={<AdminAppFeatureDetail />} />
        <Route path=":appId/transactions/:appTransactionId" element={<AdminAppFeatureTransactionDetail />} />
        <Route path=":appId/webhook/:appWebhookId" element={<AdminAppFeatureWebhookDetail />} />
      </Routes>
    </React.Suspense>
  )
}
