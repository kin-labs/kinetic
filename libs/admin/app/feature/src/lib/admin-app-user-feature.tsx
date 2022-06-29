import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminAppUserFeatureEnvDetail from './admin-app-user-feature-env-detail'

const AdminAppUserFeatureDetail = React.lazy(async () => import('./admin-app-user-feature-detail'))
const AdminAppUserFeatureList = React.lazy(async () => import('./admin-app-user-feature-list'))

export function AdminAppUserFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Routes>
        <Route index element={<AdminAppUserFeatureList />} />
        <Route path=":appId/environments/:appEnvId/*" element={<AdminAppUserFeatureEnvDetail />} />
        <Route path=":appId/*" element={<AdminAppUserFeatureDetail />} />
      </Routes>
    </React.Suspense>
  )
}
