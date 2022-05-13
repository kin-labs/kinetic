import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminAppFeatureTransactionDetail from './admin-app-feature-transaction-detail'
import AdminAppFeatureWebhookDetail from './admin-app-feature-webhook-detail'

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
        path="/apps/:appId/transactions/:appTransactionId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureTransactionDetail />
          </React.Suspense>
        )}
      />
      <Route
        path="/apps/:appId/webhook/:appWebhookId"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminAppFeatureWebhookDetail />
          </React.Suspense>
        )}
      />
    </Switch>
  )
}
