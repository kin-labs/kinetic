import { AdminAppAdminFeatureList } from '@kin-kinetic/admin/app/feature'
import { useAdminAuth } from '@kin-kinetic/admin/auth/data-access'
import { AdminSystemUiDashboard, AdminSystemUiLayout } from '@kin-kinetic/admin/system/ui'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AdminUiLink } from '@kin-kinetic/admin/ui/layout'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { UserRole } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AdminClusterFeature = React.lazy(async () => import('@kin-kinetic/admin/cluster/feature'))
const AdminUserFeature = React.lazy(async () => import('@kin-kinetic/admin/user/feature'))
const AdminWalletFeature = React.lazy(async () => import('@kin-kinetic/admin/wallet/feature'))

export function AdminSystemFeature() {
  const { loading, user } = useAdminAuth()

  const links: AdminUiLink[] = [
    { label: 'Dashboard', path: '/system/dashboard' },
    { label: 'Apps', path: '/system/apps' },
    { label: 'Clusters', path: '/system/clusters' },
    { label: 'Users', path: '/system/users' },
    { label: 'Wallets', path: '/system/wallets' },
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
        <Routes>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="apps/*" element={<AdminAppAdminFeatureList />} />
          <Route path="clusters/*" element={<AdminClusterFeature />} />
          <Route
            path="dashboard/*"
            element={<AdminSystemUiDashboard links={links.filter((link) => link.label !== 'Dashboard')} />}
          />
          <Route path="users/*" element={<AdminUserFeature />} />
          <Route path="wallets/*" element={<AdminWalletFeature />} />
        </Routes>
      </React.Suspense>
    </AdminSystemUiLayout>
  )
}
