import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { DemoShellFeature } from '@mogami/demo/shell/feature'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { copyright, name } from './admin-shell-constants'

const AdminAuthFeature = React.lazy(async () => import('@mogami/admin/auth/feature'))

export function AdminShellAnonymous() {
  return (
    <Switch>
      <Route
        path="/demo"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <DemoShellFeature />
          </React.Suspense>
        )}
      />
      <Route
        path="**"
        render={() => (
          <React.Suspense fallback={<AdminUiLoader />}>
            <AdminUiLayout copyright={copyright} name={name}>
              <AdminAuthFeature />
            </AdminUiLayout>
          </React.Suspense>
        )}
      />
    </Switch>
  )
}
