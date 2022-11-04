import { Route, Routes } from 'react-router-dom'
import { WebServerListFeature } from './web-server-list.feature'

export function WebServerFeature() {
  return (
    <Routes>
      <Route index element={<WebServerListFeature />} />
    </Routes>
  )
}
