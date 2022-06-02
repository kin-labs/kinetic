import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminAppFeatureEnvDetail from './admin-app-feature-env-detail'

const AdminAppFeatureDetail = React.lazy(async () => import('./admin-app-feature-detail'))
const AdminAppFeatureList = React.lazy(async () => import('./admin-app-feature-list'))

export function AdminAppFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/apps" exact render={() => <AdminAppFeatureList />} />
        <Route path="/apps/:appId" exact render={() => <AdminAppFeatureDetail />} />
        <Route path="/apps/:appId/environments/:appEnvId" render={() => <AdminAppFeatureEnvDetail />} />
      </Switch>
    </React.Suspense>
  )
}
