import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminAppFeatureDetail = React.lazy(async () => import('./admin-app-feature-detail'))
const AdminAppFeatureList = React.lazy(async () => import('./admin-app-feature-list'))

export function AdminAppFeature() {
  return (
    <Switch>
      <Route
        path="/apps"
        exact
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureList />
          </React.Suspense>
        )}
      />
      <Route
        path="/apps/:appId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureDetail />
          </React.Suspense>
        )}
      />
    </Switch>
  )
}
