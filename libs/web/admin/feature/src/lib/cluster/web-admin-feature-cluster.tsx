import { Route, Routes } from 'react-router-dom'
import { WebAdminFeatureClusterAdd } from './web-admin-feature-cluster-add'
import { WebAdminFeatureClusterDetail } from './web-admin-feature-cluster-detail'
import { WebAdminFeatureClusterList } from './web-admin-feature-cluster-list'

export function WebAdminFeatureCluster() {
  return (
    <Routes>
      <Route index element={<WebAdminFeatureClusterList />} />
      <Route path="add/*" element={<WebAdminFeatureClusterAdd />} />
      <Route path=":clusterId/*" element={<WebAdminFeatureClusterDetail />} />
    </Routes>
  )
}
