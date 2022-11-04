import { Box } from '@chakra-ui/react'
import { WebAdminUiDashboard } from '@kin-kinetic/web/admin/ui'
import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useUptimeQuery } from '@kin-kinetic/web/util/sdk'
import { Navigate, Route, Routes } from 'react-router-dom'

export function WebDevFeature() {
  const [{ data }] = useUptimeQuery()
  const links: WebUiLinks = [{ label: 'Development', path: '/dev' }]
  return (
    <WebAppUiSettingsLayout links={links}>
      <Routes>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route
          path="dashboard/*"
          element={
            <WebUiPage>
              <WebAdminUiDashboard title={'Nothing here yet...'} links={links} />
              <Box as="pre" fontSize="xs" color="gray.500" p={2} overflow="auto">
                {JSON.stringify(data, null, 2)}
              </Box>
            </WebUiPage>
          }
        />
      </Routes>
    </WebAppUiSettingsLayout>
  )
}
