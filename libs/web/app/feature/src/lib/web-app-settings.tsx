import { Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { useWebApp } from '@kin-kinetic/web/app/data-access'
import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { WebUiPageBackButton, WebUiPageFull, WebUiPageHeader } from '@kin-kinetic/web/ui/page'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebAppSettingsEnvironmentsTab } from './web-app-settings-environments-tab'
import { WebAppSettingsGeneralTab } from './web-app-settings-general-tab'
import { WebAppSettingsUsersTab } from './web-app-settings-users-tab'

export function WebAppSettings() {
  const { app } = useWebApp()
  const borderColor = useColorModeValue('gray.300', 'gray.700')
  if (!app) {
    return <WebUiAlert status="error" message="App not found :(" />
  }

  const links: WebUiLinks = [
    { label: 'General', path: 'general' },
    { label: 'Environments', path: 'environments' },
    { label: 'Users', path: 'users' },
  ]
  return (
    <WebUiPageFull title="App settings" to={`/apps/${app.defaultEnvUrl}`}>
      <WebAppUiSettingsLayout links={links}>
        <WebUiContainer py={0}>
          <Routes>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="environments" element={<WebAppSettingsEnvironmentsTab app={app} />} />
            <Route path="general" element={<WebAppSettingsGeneralTab app={app} />} />
            <Route path="users" element={<WebAppSettingsUsersTab app={app} />} />
          </Routes>
        </WebUiContainer>
      </WebAppUiSettingsLayout>
    </WebUiPageFull>
  )
}
