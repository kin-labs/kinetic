import { useAdminAuth } from '@mogami/admin/auth/data-access'
import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { copyright, links, name } from './admin-shell-constants'

const AdminAppFeature = React.lazy(async () => import('@mogami/admin/app/feature'))
const AdminHomeFeature = React.lazy(async () => import('@mogami/admin/home/feature'))
const AdminSystemFeature = React.lazy(async () => import('@mogami/admin/system/feature'))

export function AdminShellAuthenticated() {
  const { logout, user } = useAdminAuth()
  return (
    <AdminUiLayout copyright={copyright} name={name} links={links} logout={logout} user={user}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/apps" />
          </Route>
          <Route path="/apps" render={() => <AdminAppFeature />} />
          <Route path="/home" render={() => <AdminHomeFeature />} />
          <Route path="/system" render={() => <AdminSystemFeature />} />
        </Switch>
      </React.Suspense>
    </AdminUiLayout>
  )
}
