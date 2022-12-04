import { Route, Routes } from 'react-router-dom'
import { WebAdminFeatureQueueDetail } from './web-admin-feature-queue-detail'
import { WebAdminFeatureQueueList } from './web-admin-feature-queue-list'

export function WebAdminFeatureQueue() {
  return (
    <Routes>
      <Route index element={<WebAdminFeatureQueueList />} />
      <Route path=":type/*" element={<WebAdminFeatureQueueDetail />} />
    </Routes>
  )
}
