import { WebAppsProvider } from '@kin-kinetic/web/app/data-access'
import { Route, Routes } from 'react-router-dom'
import { WebAppCreate } from './web-app-create'
import { WebAppDetail } from './web-app-detail'
import { WebAppList } from './web-app-list'

export function WebAppFeature() {
  return (
    <WebAppsProvider>
      <Routes>
        <Route index element={<WebAppList />} />
        <Route path="create" element={<WebAppCreate />} />
        <Route path=":appId/*" element={<WebAppDetail />} />
      </Routes>
    </WebAppsProvider>
  )
}
