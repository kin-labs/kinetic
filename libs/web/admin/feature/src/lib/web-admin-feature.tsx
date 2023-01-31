import { WebAdminUiDashboard } from '@kin-kinetic/web/admin/ui'
import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { WebUiLinkProps } from '@kin-kinetic/web/ui/link'
import { MdApps, MdDashboard, MdPeople, MdMoney, MdCloud, MdQueue, MdAirlineSeatIndividualSuite } from 'react-icons/md'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebAdminFeatureApp } from './app/web-admin-feature-app'
import { WebAdminFeatureCluster } from './cluster/web-admin-feature-cluster'
import { WebAdminFeatureMigration } from './migration/web-admin-feature-migration'
import { WebAdminFeatureQueue } from './queue/web-admin-feature-queue'
import { WebAdminFeatureUser } from './user/web-admin-feature-user'
import { WebAdminFeatureWallet } from './wallet/web-admin-feature-wallet'

export function WebAdminFeature() {
  const links: WebUiLinkProps[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <MdDashboard /> },
    { label: 'Apps', path: '/admin/apps', icon: <MdApps /> },
    { label: 'Clusters', path: '/admin/clusters', icon: <MdCloud /> },
    { label: 'Migrations', path: '/admin/migrations', icon: <MdAirlineSeatIndividualSuite /> },
    { label: 'Queues', path: '/admin/queues', icon: <MdQueue /> },
    { label: 'Users', path: '/admin/users', icon: <MdPeople /> },
    { label: 'Wallets', path: '/admin/wallets', icon: <MdMoney /> },
  ]
  return (
    <WebAppUiSettingsLayout links={links} title="Admin">
      <WebUiContainer py={0}>
        <Routes>
          <Route index element={<Navigate to={'dashboard'} replace />} />
          <Route path="apps/*" element={<WebAdminFeatureApp />} />
          <Route path="clusters/*" element={<WebAdminFeatureCluster />} />
          <Route path="dashboard/*" element={<WebAdminUiDashboard title={'Admin Dashboard'} links={links} />} />
          <Route path="migrations/*" element={<WebAdminFeatureMigration />} />
          <Route path="queues/*" element={<WebAdminFeatureQueue />} />
          <Route path="users/*" element={<WebAdminFeatureUser />} />
          <Route path="wallets/*" element={<WebAdminFeatureWallet />} />
        </Routes>
      </WebUiContainer>
    </WebAppUiSettingsLayout>
  )
}
