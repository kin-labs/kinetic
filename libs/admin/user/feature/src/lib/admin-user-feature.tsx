import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminUserFeatureDetail = React.lazy(async () => import('./admin-user-feature-detail'))
const AdminUserFeatureList = React.lazy(async () => import('./admin-user-feature-list'))

export function AdminUserFeature() {
  return (
    <Suspense fallback={<AdminUiLoader />}>
      <Routes>
        <Route index element={<AdminUserFeatureList />} />
        <Route path=":userId" element={<AdminUserFeatureDetail />} />
      </Routes>
    </Suspense>
  )
}
