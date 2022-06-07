import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminUserFeatureDetail = React.lazy(async () => import('./admin-user-feature-detail'))
const AdminUserFeatureList = React.lazy(async () => import('./admin-user-feature-list'))

export function AdminUserFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/users" exact render={() => <AdminUserFeatureList />} />
        <Route path="/users/:userId" render={() => <AdminUserFeatureDetail />} />
      </Switch>
    </React.Suspense>
  )
}
