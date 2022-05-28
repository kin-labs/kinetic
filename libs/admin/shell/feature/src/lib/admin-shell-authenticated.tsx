import { useAdminAuth } from '@mogami/admin/auth/data-access'
import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/apps/*" element={<AdminAppFeature />} />
          <Route path="/clusters/*" element={<AdminClusterFeature />} />
          <Route path="/home" element={<AdminHomeFeature />} />
          <Route path="/users/*" element={<AdminUserFeature />} />
        </Routes>
      </React.Suspense>
    </AdminUiLayout>
  )
}
