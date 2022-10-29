import { useToast } from '@chakra-ui/react'
import { useWebApp, WebAppProvider } from '@kin-kinetic/web/app/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { useWebUiLayout } from '@kin-kinetic/web/ui/layout'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WebAppEnvCreate } from './web-app-env-create'
import { WebAppEnvDetail } from './web-app-env-detail'
import { WebAppSettings } from './web-app-settings'

export function WebAppDetail() {
  const { appId } = useParams<{ appId: string }>()

  if (!appId) {
    return <WebUiAlert status="error" message="AppId not found :(" />
  }

  return (
    <WebAppProvider appId={appId}>
      <WebAppDetailRoutes></WebAppDetailRoutes>
    </WebAppProvider>
  )
}

export function WebAppDetailRoutes() {
  const toast = useToast()
  const { app, loading } = useWebApp()
  const { setApp } = useWebUiLayout()
  useEffect(() => {
    if (!app) return
    setApp(app)
    return () => setApp(undefined)
  }, [app, setApp])

  if (loading) {
    return <WebUiLoader />
  }

  if (!app && !loading) {
    return <WebUiAlert status="error" message="App not found :(" />
  }

  if (!app?.envs?.length) {
    toast({
      status: 'warning',
      title: 'This app has no environments',
    })
  }

  return (
    <Routes>
      {app?.defaultEnvUrl}
      <Route
        index
        element={<Navigate to={`${`/apps/${app?.defaultEnvUrl}` || `/apps/${app?.id}/environments/create`}`} replace />}
      ></Route>
      <Route path="environments" element={<Navigate to={'../settings/environments'} replace />} />
      <Route path="environments/create/*" element={<WebAppEnvCreate />} />
      <Route path="environments/:environmentId/*" element={<WebAppEnvDetail />} />
      <Route path="settings/*" element={<WebAppSettings />} />
    </Routes>
  )
}
