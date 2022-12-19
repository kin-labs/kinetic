import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { App, AppEnv } from '@kin-kinetic/web/util/sdk'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebAppEnvSettingsAccess } from './web-app-env-settings-access'
import { WebAppEnvSettingsMaintenance } from './web-app-env-settings-maintenance'
import { WebAppEnvSettingsMints } from './web-app-env-settings-mints'
import { WebAppEnvSettingsSolana } from './web-app-env-settings-solana'
import { WebAppEnvSettingsWebhooks } from './web-app-env-settings-webhooks'

export function WebAppEnvSettings({ app, env }: { app: App; env: AppEnv }) {
  const links: WebUiLinks = [
    { label: 'Access Control', path: 'access-control' },
    { label: 'Maintenance', path: 'maintenance' },
    { label: 'Mints', path: 'mints' },
    { label: 'Solana', path: 'solana' },
    { label: 'Webhooks', path: 'webhooks' },
  ]
  return (
    <WebAppUiSettingsLayout links={links} title={`Environment Settings`}>
      <WebUiContainer>
        <Routes>
          <Route index element={<Navigate to="mints" replace />} />
          <Route path="access-control" element={<WebAppEnvSettingsAccess app={app} env={env} />} />
          <Route path="maintenance" element={<WebAppEnvSettingsMaintenance app={app} env={env} />} />
          <Route path="mints" element={<WebAppEnvSettingsMints app={app} env={env} />} />
          <Route path="solana" element={<WebAppEnvSettingsSolana app={app} env={env} />} />
          <Route path="webhooks" element={<WebAppEnvSettingsWebhooks app={app} env={env} />} />
        </Routes>
      </WebUiContainer>
    </WebAppUiSettingsLayout>
  )
}
