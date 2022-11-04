import { WebToolboxProvider } from '@kin-kinetic/web/toolbox/data-access'
import { Route, Routes } from 'react-router-dom'
import { WebToolboxIndexFeature } from './web-toolbox-index.feature'

export function WebToolboxFeature() {
  return (
    <WebToolboxProvider>
      <Routes>
        <Route index element={<WebToolboxIndexFeature />} />
      </Routes>
    </WebToolboxProvider>
  )
}
