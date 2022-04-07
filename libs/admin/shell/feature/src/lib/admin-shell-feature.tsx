import { AdminUiLayout, AdminUiLink } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { createGraphqlClient } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'urql'

const client = createGraphqlClient()

const AdminAppFeature = React.lazy(async () => import('@mogami/admin/app/feature'))
const AdminHomeFeature = React.lazy(async () => import('@mogami/admin/home/feature'))

export function AdminShellFeature() {
  const name = 'Mogami Admin'
  const copyright = <p>Kin Foundation &copy; 2022</p>
  const links: AdminUiLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'Apps', path: '/apps' },
  ]
  return (
    <Provider value={client}>
      <AdminUiLayout copyright={copyright} name={name} links={links}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route
            path="/apps"
            render={() => (
              <React.Suspense fallback={<AdminUiLoader />}>
                <AdminAppFeature />
              </React.Suspense>
            )}
          />
          <Route
            path="/home"
            render={() => (
              <React.Suspense fallback={<AdminUiLoader />}>
                <AdminHomeFeature />
              </React.Suspense>
            )}
          />
        </Switch>
      </AdminUiLayout>
    </Provider>
  )
}
