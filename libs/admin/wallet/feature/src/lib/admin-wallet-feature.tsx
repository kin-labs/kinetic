import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AdminWalletFeatureDetail = React.lazy(async () => import('./admin-wallet-feature-detail'))
const AdminWalletFeatureList = React.lazy(async () => import('./admin-wallet-feature-list'))

export function AdminWalletFeature() {
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      <Switch>
        <Route path="/system/wallets" exact render={() => <AdminWalletFeatureList />} />
        <Route path="/system/wallets/:walletId" render={() => <AdminWalletFeatureDetail />} />
      </Switch>
    </React.Suspense>
  )
}
