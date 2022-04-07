import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminUserFeatureDetail = React.lazy(async () => import('./admin-user-feature-detail'))
const AdminUserFeatureList = React.lazy(async () => import('./admin-user-feature-list'))

export default function AdminUserFeature() {
  return (
    <Switch>
      <Route
        path="/users"
        exact
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminUserFeatureList />
          </React.Suspense>
        )}
      />
      <Route
        path="/users/:userId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminUserFeatureDetail />
          </React.Suspense>
        )}
      />
    </Switch>
  )
}
