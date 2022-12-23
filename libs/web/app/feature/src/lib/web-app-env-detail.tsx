import { useWebApp, WebTransactionProvider } from '@kin-kinetic/web/app/data-access'
import { WebAppUiTabs } from '@kin-kinetic/web/app/ui'
import { WebKeypairProvider } from '@kin-kinetic/web/keypair/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WebAppEnvDashboardTab } from './web-app-env-dashboard-tab'
import { WebAppEnvSettings } from './web-app-env-settings'
import { WebAppEnvToolbox } from './web-app-env-toolbox'
import { WebAppEnvTransactionTab } from './web-app-env-transaction-tab'
import { WebAppEnvTransactionsTab } from './web-app-env-transactions-tab'
import { WebAppEnvWalletsTab } from './web-app-env-wallets-tab'

export function WebAppEnvDetail() {
  const { environmentId } = useParams<{ environmentId: string }>()
  const { app, loading } = useWebApp()

  if (loading) {
    return <WebUiLoader />
  }

  if (!app) {
    return <WebUiAlert status="error" message="App not found :(" />
  }

  const environment = app?.envs?.find((item) => item.id === environmentId)
  if (!environment) {
    return <WebUiAlert status="error" message="Environment not found :(" />
  }

  const tabs: WebUiLinks = [
    { label: 'Overview', path: 'overview' },
    { label: 'Transactions', path: 'transactions' },
    { label: 'Toolbox', path: 'toolbox' },
    { label: 'Wallets', path: 'wallets' },
    { label: 'Settings', path: 'settings' },
  ]

  return (
    <WebAppUiTabs app={app} environment={environment} tabs={tabs}>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<WebAppEnvDashboardTab app={app} env={environment} />} />
        <Route
          path="transactions"
          element={
            <WebTransactionProvider>
              <WebAppEnvTransactionsTab app={app} env={environment} />
            </WebTransactionProvider>
          }
        />
        <Route path="transactions/:transactionId" element={<WebAppEnvTransactionTab app={app} env={environment} />} />
        <Route path="wallets" element={<WebAppEnvWalletsTab app={app} env={environment} />} />
        <Route path="settings/*" element={<WebAppEnvSettings app={app} env={environment} />} />
        <Route
          path="toolbox/*"
          element={
            <WebKeypairProvider>
              <WebAppEnvToolbox app={app} env={environment} />
            </WebKeypairProvider>
          }
        />
      </Routes>
    </WebAppUiTabs>
  )
}
