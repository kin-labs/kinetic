import { useAdminAuth } from '@mogami/admin/auth/data-access'
import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { copyright, links, name } from './admin-shell-constants'

const AdminAppFeature = React.lazy(async () => import('@mogami/admin/app/feature'))
const AdminClusterFeature = React.lazy(async () => import('@mogami/admin/cluster/feature'))
const AdminHomeFeature = React.lazy(async () => import('@mogami/admin/home/feature'))
const AdminUserFeature = React.lazy(async () => import('@mogami/admin/user/feature'))

export function AdminShellAuthenticated() {
  const { logout, user } = useAdminAuth()
  return (
    <AdminUiLayout copyright={copyright} name={name} links={links} logout={logout} user={user}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/apps" render={() => <AdminAppFeature />} />
          <Route path="/clusters" render={() => <AdminClusterFeature />} />
          <Route path="/home" render={() => <AdminHomeFeature />} />
          <Route path="/users" render={() => <AdminUserFeature />} />
        </Switch>
      </React.Suspense>
    </AdminUiLayout>
  )
}
