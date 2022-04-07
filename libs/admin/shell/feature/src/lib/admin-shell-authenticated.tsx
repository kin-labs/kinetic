import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { copyright, links, name } from './admin-shell-constants'

const AdminAppFeature = React.lazy(async () => import('@mogami/admin/app/feature'))
const AdminHomeFeature = React.lazy(async () => import('@mogami/admin/home/feature'))

export function AdminShellAuthenticated() {
  return (
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
  )
}
