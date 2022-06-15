import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminClusterFeatureDetail = React.lazy(async () => import('./admin-cluster-feature-detail'))
const AdminClusterFeatureList = React.lazy(async () => import('./admin-cluster-feature-list'))

export function AdminClusterFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/system/clusters" exact render={() => <AdminClusterFeatureList />} />
        <Route path="/system/clusters/:clusterId" render={() => <AdminClusterFeatureDetail />} />
      </Switch>
    </React.Suspense>
  )
}
