import { useAdminAuth } from '@kin-kinetic/admin/auth/data-access'
import { AdminUiLayout } from '@kin-kinetic/admin/ui/layout'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { copyright, links, logo, name } from './admin-shell-constants'

const AdminAppFeature = React.lazy(async () => import('@kin-kinetic/admin/app/feature'))
const AdminHomeFeature = React.lazy(async () => import('@kin-kinetic/admin/home/feature'))
const AdminSystemFeature = React.lazy(async () => import('@kin-kinetic/admin/system/feature'))

export function AdminShellAuthenticated() {
  const { logout, user } = useAdminAuth()
  return (
    <AdminUiLayout copyright={copyright} name={name} links={links} logo={logo} logout={logout} user={user}>
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
