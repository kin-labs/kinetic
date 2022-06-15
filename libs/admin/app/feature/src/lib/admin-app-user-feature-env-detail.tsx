import { useToast } from '@chakra-ui/react'
import { UserAppEnvProvider } from '@kin-kinetic/admin/app/data-access'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useUserAppEnvQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { AdminAppUserAppEnvDetailOverview } from './admin-app-user-app-env-detail-overview'
import { AdminAppUserAppEnvDetailSettings } from './admin-app-user-app-env-detail-settings'
import { AdminAppUserAppEnvDetailTransaction } from './admin-app-user-app-env-detail-transaction'
import { AdminAppUserAppEnvDetailTransactions } from './admin-app-user-app-env-detail-transactions'
import { AdminAppUserAppEnvDetailWallet } from './admin-app-user-app-env-detail-wallet'
import { AdminAppUserAppEnvDetailWallets } from './admin-app-user-app-env-detail-wallets'
import { AdminAppUserAppEnvDetailWebhook } from './admin-app-user-app-env-detail-webhook'
import { AdminAppUserAppEnvDetailWebhooks } from './admin-app-user-app-env-detail-webhooks'

export default function AdminAppUserFeatureEnvDetail() {
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
        <UserAppEnvProvider appEnv={data.item} baseUrl={url}>
          <Switch>
            <Route path={path} exact render={() => <Redirect to={`${url}/overview`} />} />
            <Route path={`${path}/overview`} render={() => <AdminAppUserAppEnvDetailOverview />} />
            <Route path={`${path}/settings`} render={() => <AdminAppUserAppEnvDetailSettings />} />
            <Route
              path={`${path}/transactions/:appTransactionId`}
              render={() => <AdminAppUserAppEnvDetailTransaction />}
            />
            <Route path={`${path}/transactions`} render={() => <AdminAppUserAppEnvDetailTransactions />} />
            <Route path={`${path}/wallets/:walletId`} render={() => <AdminAppUserAppEnvDetailWallet />} />
            <Route path={`${path}/wallets`} render={() => <AdminAppUserAppEnvDetailWallets />} />
            <Route path={`${path}/webhooks/:appWebhookId`} render={() => <AdminAppUserAppEnvDetailWebhook />} />
            <Route path={`${path}/webhooks`} render={() => <AdminAppUserAppEnvDetailWebhooks />} />
          </Switch>
        </UserAppEnvProvider>
      ) : (
        <AdminUiAlert status="warning" message={'App environment not found'} />
      )}
    </React.Suspense>
  )
}
