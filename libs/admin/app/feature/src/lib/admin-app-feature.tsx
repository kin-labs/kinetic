import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminAppFeatureCreationDetail from './admin-app-feature-creation-detail'
import AdminAppFeatureTransactionDetail from './admin-app-feature-transaction-detail'
import AdminAppFeatureWebhookIncomingDetail from './admin-app-feature-webhook-incoming-detail'

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
        exact
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureDetail />
          </React.Suspense>
        )}
      />
      <Route
        path="/apps/:appId/creations/:appCreationId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureCreationDetail />
          </React.Suspense>
        )}
      />
      <Route
        path="/apps/:appId/transactions/:appTransactionId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureTransactionDetail />
          </React.Suspense>
        )}
      />
      <Route
        path="/apps/:appId/webhook-incoming/:appWebhookIncomingId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureWebhookIncomingDetail />
          </React.Suspense>
        )}
      />
    </Switch>
  )
}
