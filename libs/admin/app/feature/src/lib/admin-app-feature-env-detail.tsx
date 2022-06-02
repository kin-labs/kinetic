import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppEnvQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { AppEnvProvider } from './app-env-provider'
import { EnvDetailOverview } from './env-detail-overview'
import { EnvDetailTransactions } from './env-detail-transactions'
import { EnvDetailWallets } from './env-detail-wallets'
import { EnvDetailWebhooks } from './env-detail-webhooks'

export default function AdminAppFeatureEnvDetail() {
  const { path, url } = useRouteMatch()
  const { appId, appEnvId } = useParams<{ appId: string; appEnvId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, fetching }] = useAppEnvQuery({ variables: { appId: appId!, appEnvId: appEnvId! } })

  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      {!fetching && data?.item ? (
        <AppEnvProvider env={data.item} baseUrl={url}>
          <Switch>
            <Route path={path} exact render={() => <EnvDetailOverview />} />
            <Route path={`${path}/transactions`} render={() => <EnvDetailTransactions />} />
            <Route path={`${path}/wallets`} render={() => <EnvDetailWallets />} />
            <Route path={`${path}/webhooks`} render={() => <EnvDetailWebhooks />} />
          </Switch>
        </AppEnvProvider>
      ) : (
        <AdminUiLoader />
      )}
    </React.Suspense>
  )
}
