import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminUserFeatureDetail = React.lazy(async () => import('./admin-user-feature-detail'))
const AdminUserFeatureList = React.lazy(async () => import('./admin-user-feature-list'))

export function AdminUserFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/system/users" exact render={() => <AdminUserFeatureList />} />
        <Route path="/system/users/:userId" render={() => <AdminUserFeatureDetail />} />
      </Switch>
    </React.Suspense>
  )
}
