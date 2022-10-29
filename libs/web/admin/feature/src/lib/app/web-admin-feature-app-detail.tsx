import { HStack, Stack, Text, useToast } from '@chakra-ui/react'
import { WebAdminUiAppUserList, WebAdminUiTabs } from '@kin-kinetic/web/admin/ui'
import { WebAppUiAppEnvList } from '@kin-kinetic/web/app/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiAppAvatar } from '@kin-kinetic/web/ui/app-avatar'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage, WebUiPageBackButton } from '@kin-kinetic/web/ui/page'
import { AppEnv, useAdminAppQuery, useAdminDeleteAppEnvMutation } from '@kin-kinetic/web/util/admin-sdk'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WebAdminFeatureAppUpdate } from './web-admin-feature-app-update'

export function WebAdminFeatureAppDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  const [, deleteAppMutation] = useAdminDeleteAppEnvMutation()
  const [{ data, fetching }, refreshApp] = useAdminAppQuery({
    variables: { appId: appId || '' },
  })

  const app = data?.item

  const deleteAppEnv = (appEnv: AppEnv) => {
    if (!window.confirm('Are you sure?') || !appEnv.id || !appId) return

    deleteAppMutation({ appId, appEnvId: appEnv.id })
      .then((res) => {
        refreshApp()
        if (res.data?.deleted) {
          toast({ status: 'success', title: 'Environment deleted' })
        } else {
          toast({
            status: 'error',
            title: 'Something went wrong',
            description: `${res.error}`,
          })
        }
      })
      .catch((error) =>
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        }),
      )
  }

  if (fetching) {
    return <WebUiLoaderPage />
  }

  if (!app) {
    return <WebUiAlert status="error" message="App not found :(" />
  }

  const tabs = [
    { label: 'Environments', path: 'environments' },
    { label: 'Users', path: 'users' },
    { label: 'Settings', path: 'settings' },
  ]

  return (
    <WebUiPage
      title={
        <HStack spacing={2}>
          <WebUiAppAvatar logoUrl={app?.logoUrl} size={'sm'} />
          <Text>{app?.name}</Text>
        </HStack>
      }
      actionLeft={<WebUiPageBackButton />}
    >
      <WebAdminUiTabs tabs={tabs}>
        <Routes>
          <Route index element={<Navigate to="environments" replace />} />
          <Route
            path="environments"
            element={
              <Stack>
                {app?.envs?.length ? (
                  <WebAppUiAppEnvList appEnvs={app.envs || []} deleteAppEnv={deleteAppEnv} />
                ) : (
                  <WebUiCard>
                    <WebUiAlert message={'This app has no environments.'} />
                  </WebUiCard>
                )}
              </Stack>
            }
          />
          <Route path="users" element={<WebAdminUiAppUserList appUsers={app?.users || []} />} />
          <Route path="settings" element={<WebAdminFeatureAppUpdate app={app} />} />
        </Routes>
      </WebAdminUiTabs>
    </WebUiPage>
  )
}
