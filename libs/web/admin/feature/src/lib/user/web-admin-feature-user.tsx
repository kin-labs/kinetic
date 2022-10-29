import { Route, Routes } from 'react-router-dom'
import { WebAdminFeatureUserAdd } from './web-admin-feature-user-add'
import { WebAdminFeatureUserDetail } from './web-admin-feature-user-detail'
import { WebAdminFeatureUserList } from './web-admin-feature-user-list'

export function WebAdminFeatureUser() {
  return (
    <Routes>
      <Route index element={<WebAdminFeatureUserList />} />
      <Route path="add/*" element={<WebAdminFeatureUserAdd />} />
      <Route path=":userId/*" element={<WebAdminFeatureUserDetail />} />
    </Routes>
  )
}
