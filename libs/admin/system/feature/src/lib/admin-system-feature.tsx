import { useAdminAuth } from '@mogami/admin/auth/data-access'
import { AdminSystemUiDashboard, AdminSystemUiLayout } from '@mogami/admin/system/ui'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { AdminUiLink } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { UserRole } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const AdminClusterFeature = React.lazy(async () => import('@mogami/admin/cluster/feature'))
const AdminUserFeature = React.lazy(async () => import('@mogami/admin/user/feature'))

export function AdminSystemFeature() {
  const { loading, user } = useAdminAuth()

  const links: AdminUiLink[] = [
    { label: 'Dashboard', path: '/system/dashboard' },
    { label: 'Clusters', path: '/system/clusters' },
    { label: 'Users', path: '/system/users' },
  ]

  if (loading) {
    return <AdminUiLoader />
  }

  if (!user || user?.role !== UserRole.Admin) {
    return <AdminUiAlert status="error" message="You don't have access to this area." title="Permission Denied" />
  }

  return (
    <AdminSystemUiLayout links={links}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Switch>
          <Route path="/system" exact>
            <Redirect to="/system/dashboard" />
          </Route>
          <Route path="/system/clusters" render={() => <AdminClusterFeature />} />
          <Route
            path="/system/dashboard"
            render={() => <AdminSystemUiDashboard links={links.filter((link) => link.label !== 'Dashboard')} />}
          />
          <Route path="/system/users" render={() => <AdminUserFeature />} />
        </Switch>
      </React.Suspense>
    </AdminSystemUiLayout>
  )
}
