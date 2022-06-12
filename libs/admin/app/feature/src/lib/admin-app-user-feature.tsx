import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminAppUserFeatureEnvDetail from './admin-app-user-feature-env-detail'

const AdminAppUserFeatureDetail = React.lazy(async () => import('./admin-app-user-feature-detail'))
const AdminAppUserFeatureList = React.lazy(async () => import('./admin-app-user-feature-list'))

export function AdminAppUserFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/apps" exact render={() => <AdminAppUserFeatureList />} />
        <Route path="/apps/:appId/environments/:appEnvId" render={() => <AdminAppUserFeatureEnvDetail />} />
        <Route path="/apps/:appId" render={() => <AdminAppUserFeatureDetail />} />
      </Switch>
    </React.Suspense>
  )
}
