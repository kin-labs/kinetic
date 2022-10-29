import { WebAdminUiTabs } from '@kin-kinetic/web/admin/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage, WebUiPageBackButton } from '@kin-kinetic/web/ui/page'
import { useAdminClusterQuery } from '@kin-kinetic/web/util/admin-sdk'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WebAdminFeatureClusterMintsTab } from './web-admin-feature-cluster-mints-tab'
import { WebAdminFeatureClusterSettingsTab } from './web-admin-feature-cluster-settings-tab'

export function WebAdminFeatureClusterDetail() {
  const { clusterId } = useParams<{ clusterId: string }>()
  const [{ data, fetching }] = useAdminClusterQuery({
    variables: { clusterId: clusterId || '' },
  })

  if (fetching) {
    return <WebUiLoaderPage />
  }

  if (!data?.item) {
    return <WebUiAlert status="error" message="Cluster not found :(" />
  }

  const tabs = [
    { label: 'Mints', path: 'mints' },
    { label: 'Settings', path: 'settings' },
  ]

  return (
    <WebUiPage title={data.item.name || ''} actionLeft={<WebUiPageBackButton />}>
      <WebAdminUiTabs tabs={tabs}>
        <Routes>
          <Route index element={<Navigate to="mints" replace />} />
          <Route
            path="mints"
            element={<WebAdminFeatureClusterMintsTab cluster={data?.item} mints={data?.item.mints} />}
          />
          <Route path="settings" element={<WebAdminFeatureClusterSettingsTab cluster={data.item} />} />
        </Routes>
      </WebAdminUiTabs>
    </WebUiPage>
  )
}
