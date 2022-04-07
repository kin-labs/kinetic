import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { copyright, name } from './admin-shell-constants'

const AdminAuthFeature = React.lazy(async () => import('@mogami/admin/auth/feature'))

export function AdminShellAnonymous() {
  return (
    <AdminUiLayout copyright={copyright} name={name}>
      <Switch>
        <Route
          path="**"
          render={() => (
            <React.Suspense fallback={<AdminUiLoader />}>
              <AdminAuthFeature />
            </React.Suspense>
          )}
        />
      </Switch>
    </AdminUiLayout>
  )
}
