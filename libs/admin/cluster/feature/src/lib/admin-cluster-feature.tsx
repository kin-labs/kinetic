import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminClusterFeatureDetail = React.lazy(async () => import('./admin-cluster-feature-detail'))
const AdminClusterFeatureList = React.lazy(async () => import('./admin-cluster-feature-list'))

export function AdminClusterFeature() {
  return (
    <Switch>
      <Route
        path="/clusters"
        exact
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminClusterFeatureList />
          </React.Suspense>
        )}
      />
      <Route
        path="/clusters/:clusterId"
        exact
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminClusterFeatureDetail />
          </React.Suspense>
        )}
      />
    </Switch>
  )
}
