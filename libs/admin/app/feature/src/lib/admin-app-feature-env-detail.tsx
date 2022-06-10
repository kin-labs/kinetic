import { useToast } from '@chakra-ui/react'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useUserAppEnvQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { AppEnvProvider } from './app-env-provider'
import { EnvDetailOverview } from './env-detail-overview'
import { EnvDetailSettings } from './env-detail-settings'
import { EnvDetailTransaction } from './env-detail-transaction'
import { EnvDetailTransactions } from './env-detail-transactions'
import { EnvDetailWallets } from './env-detail-wallets'
import { EnvDetailWebhook } from './env-detail-webhook'
import { EnvDetailWebhooks } from './env-detail-webhooks'

export default function AdminAppFeatureEnvDetail() {
  const toast = useToast()

  const { path, url } = useRouteMatch()
  const { appId, appEnvId } = useParams<{ appId: string; appEnvId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, error, fetching }] = useUserAppEnvQuery({ variables: { appId: appId!, appEnvId: appEnvId! } })

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }
  return (
    <React.Suspense fallback={<AdminUiLoader />}>
      {data?.item ? (
        <AppEnvProvider appEnv={data.item} baseUrl={url}>
          <Switch>
            <Route path={path} exact render={() => <Redirect to={`${url}/overview`} />} />
            <Route path={`${path}/overview`} render={() => <EnvDetailOverview />} />
            <Route path={`${path}/settings`} render={() => <EnvDetailSettings />} />
            <Route path={`${path}/transactions/:appTransactionId`} render={() => <EnvDetailTransaction />} />
            <Route path={`${path}/transactions`} render={() => <EnvDetailTransactions />} />
            <Route path={`${path}/wallets`} render={() => <EnvDetailWallets />} />
            <Route path={`${path}/webhooks/:appWebhookId`} render={() => <EnvDetailWebhook />} />
            <Route path={`${path}/webhooks`} render={() => <EnvDetailWebhooks />} />
          </Switch>
        </AppEnvProvider>
      ) : (
        <AdminUiAlert status="warning" message={'App environment not found'} />
      )}
    </React.Suspense>
  )
}
