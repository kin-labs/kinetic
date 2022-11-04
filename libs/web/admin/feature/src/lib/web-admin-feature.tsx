import { WebAdminUiDashboard } from '@kin-kinetic/web/admin/ui'
import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { WebUiLinkProps } from '@kin-kinetic/web/ui/link'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebAdminFeatureApp } from './app/web-admin-feature-app'
import { WebAdminFeatureCluster } from './cluster/web-admin-feature-cluster'
import { WebAdminFeatureUser } from './user/web-admin-feature-user'
import { WebAdminFeatureWallet } from './wallet/web-admin-feature-wallet'

export function WebAdminFeature() {
  const links: WebUiLinkProps[] = [
    { label: 'Admin Dashboard', path: '/admin/dashboard' },
    { label: 'Apps', path: '/admin/apps' },
    { label: 'Clusters', path: '/admin/clusters' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Wallets', path: '/admin/wallets' },
  ]
  return (
    <WebAppUiSettingsLayout links={links}>
      <WebUiContainer py={0}>
        <Routes>
          <Route index element={<Navigate to={'dashboard'} replace />} />
          <Route path="apps/*" element={<WebAdminFeatureApp />} />
          <Route path="clusters/*" element={<WebAdminFeatureCluster />} />
          <Route path="dashboard/*" element={<WebAdminUiDashboard title={'Admin Dashboard'} links={links} />} />
          <Route path="users/*" element={<WebAdminFeatureUser />} />
          <Route path="wallets/*" element={<WebAdminFeatureWallet />} />
        </Routes>
      </WebUiContainer>
    </WebAppUiSettingsLayout>
  )
}
