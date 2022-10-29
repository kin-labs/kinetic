import { Box } from '@chakra-ui/react'
import { WebAdminUiDashboard } from '@kin-kinetic/web/admin/ui'
import { WebAppUiSettingsLayout } from '@kin-kinetic/web/app/ui'
import { WebDevOnboardingProvider } from '@kin-kinetic/web/dev/data-access'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useUptimeQuery } from '@kin-kinetic/web/util/admin-sdk'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebDevFeatureOnboarding } from './web-dev-feature-onboarding'

export function WebDevFeature() {
  const [{ data }] = useUptimeQuery()
  const links: WebUiLinks = [
    { label: 'Development Dashboard', path: '/dev/dashboard' },
    { label: 'Onboarding', path: '/dev/onboarding' },
  ]
  return (
    <WebAppUiSettingsLayout links={links}>
      <Routes>
        <Route index element={<Navigate to={'dashboard'} replace />} />
        <Route
          path="onboarding/*"
          element={
            <WebDevOnboardingProvider>
              <WebDevFeatureOnboarding />
            </WebDevOnboardingProvider>
          }
        />

        <Route
          path="dashboard/*"
          element={
            <WebUiPage>
              <WebAdminUiDashboard title={'Development Dashboard'} links={links} />
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
