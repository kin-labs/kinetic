import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { copyright, links, name } from './admin-shell-constants'

const AdminAppFeature = React.lazy(async () => import('@mogami/admin/app/feature'))
const AdminHomeFeature = React.lazy(async () => import('@mogami/admin/home/feature'))
const AdminUserFeature = React.lazy(async () => import('@mogami/admin/user/feature'))

export function AdminShellAuthenticated() {
  return (
    <AdminUiLayout copyright={copyright} name={name} links={links}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/apps" render={() => <AdminAppFeature />} />
          <Route path="/home" render={() => <AdminHomeFeature />} />
          <Route path="/users" render={() => <AdminUserFeature />} />
        </Switch>
      </React.Suspense>
    </AdminUiLayout>
  )
}
