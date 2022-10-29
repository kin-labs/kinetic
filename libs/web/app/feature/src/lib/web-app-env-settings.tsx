import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { App, AppEnv } from '@kin-kinetic/web/util/admin-sdk'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebAppEnvSettingsAccess } from './web-app-env-settings-access'
import { WebAppEnvSettingsMints } from './web-app-env-settings-mints'
import { WebAppEnvSettingsWebhooks } from './web-app-env-settings-webhooks'

export function WebAppEnvSettings({ app, env }: { app: App; env: AppEnv }) {
  const links: WebUiLinks = [
    { label: 'Mints', path: 'mints' },
    { label: 'Access Control', path: 'access-control' },
    { label: 'Webhooks', path: 'webhooks' },
  ]
  return (
    <WebAppUiSettingsLayout links={links}>
      <WebUiContainer>
        <Routes>
          <Route index element={<Navigate to="mints" replace />} />
          <Route path="mints" element={<WebAppEnvSettingsMints app={app} env={env} />} />
          <Route path="access-control" element={<WebAppEnvSettingsAccess app={app} env={env} />} />
          <Route path="webhooks" element={<WebAppEnvSettingsWebhooks app={app} env={env} />} />
        </Routes>
      </WebUiContainer>
    </WebAppUiSettingsLayout>
  )
}
