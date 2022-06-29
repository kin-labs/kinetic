import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminClusterFeatureDetail = React.lazy(async () => import('./admin-cluster-feature-detail'))
const AdminClusterFeatureList = React.lazy(async () => import('./admin-cluster-feature-list'))

export function AdminClusterFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Routes>
        <Route index element={<AdminClusterFeatureList />} />
        <Route path=":clusterId/*" element={<AdminClusterFeatureDetail />} />
      </Routes>
    </React.Suspense>
  )
}
