import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminClusterFeatureDetail = React.lazy(async () => import('./admin-cluster-feature-detail'))
const AdminClusterFeatureList = React.lazy(async () => import('./admin-cluster-feature-list'))

export function AdminClusterFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/clusters" exact render={() => <AdminClusterFeatureList />} />
        <Route path="/clusters/:clusterId" render={() => <AdminClusterFeatureDetail />} />
      </Switch>
    </React.Suspense>
  )
}
