import { WebAdminUiTabs } from '@kin-kinetic/web/admin/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage, WebUiPageBackButton } from '@kin-kinetic/web/ui/page'
import { useAdminUserQuery } from '@kin-kinetic/web/util/sdk'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WebAdminFeatureUserApps } from './web-admin-feature-user-apps'
import { WebAdminFeatureUserEmails } from './web-admin-feature-user-emails'
import { WebAdminFeatureUserSettings } from './web-admin-feature-user-settings'

export function WebAdminFeatureUserDetail() {
  const { userId } = useParams<{ userId: string }>()
  const [{ data, fetching }] = useAdminUserQuery({
    variables: { userId: userId || '' },
  })

  if (fetching) {
    return <WebUiLoaderPage />
  }

  if (!data?.item) {
    return <WebUiAlert status="error" message="User not found :(" />
  }

  const tabs = [
    { label: 'Apps', path: 'apps' },
    { label: 'Emails', path: 'emails' },
    { label: 'Settings', path: 'settings' },
  ]

  const emails = data?.item?.emails
  const apps = data?.item?.apps

  return (
    <WebUiPage title={data.item.name || ''} actionLeft={<WebUiPageBackButton />}>
      <WebAdminUiTabs tabs={tabs}>
        <Routes>
          <Route index element={<Navigate to="apps" replace />} />
          <Route path="apps" element={<WebAdminFeatureUserApps apps={apps} />} />
          <Route path="emails" element={<WebAdminFeatureUserEmails emails={emails} />} />
          <Route path="settings" element={<WebAdminFeatureUserSettings user={data.item} />} />
        </Routes>
      </WebAdminUiTabs>
    </WebUiPage>
  )
}
