import { Route, Routes } from 'react-router-dom'
import { WebAdminFeatureAppCreate } from './web-admin-feature-app-create'
import { WebAdminFeatureAppDetail } from './web-admin-feature-app-detail'
import { WebAdminFeatureAppList } from './web-admin-feature-app-list'

export function WebAdminFeatureApp() {
  return (
    <Routes>
      <Route index element={<WebAdminFeatureAppList />} />
      <Route path="add/*" element={<WebAdminFeatureAppCreate />} />
      <Route path=":appId/*" element={<WebAdminFeatureAppDetail />} />
    </Routes>
  )
}
