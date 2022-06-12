import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { copyright, logo, name } from './admin-shell-constants'

const AdminAuthFeature = React.lazy(async () => import('@mogami/admin/auth/feature'))

export function AdminShellAnonymous() {
  return (
    <AdminUiLayout copyright={copyright} logo={logo} name={name}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Switch>
          <Route path="**" render={() => <AdminAuthFeature />} />
        </Switch>
      </React.Suspense>
    </AdminUiLayout>
  )
}
