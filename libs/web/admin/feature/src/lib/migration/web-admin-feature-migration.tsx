import { Route, Routes } from 'react-router-dom'
import { WebAdminFeatureMigrationList } from './web-admin-feature-migration-list'

export function WebAdminFeatureMigration() {
  return (
    <Routes>
      <Route index element={<WebAdminFeatureMigrationList />} />
    </Routes>
  )
}
