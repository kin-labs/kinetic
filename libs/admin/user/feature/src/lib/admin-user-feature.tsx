import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminUserFeatureDetail = React.lazy(async () => import('./admin-user-feature-detail'))
const AdminUserFeatureList = React.lazy(async () => import('./admin-user-feature-list'))

export function AdminUserFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Routes>
        <Route index element={<AdminUserFeatureList />} />
        <Route path=":userId/*" element={<AdminUserFeatureDetail />} />
      </Routes>
    </React.Suspense>
  )
}
