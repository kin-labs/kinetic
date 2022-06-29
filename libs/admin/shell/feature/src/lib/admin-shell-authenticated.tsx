import { useAdminAuth } from '@kin-kinetic/admin/auth/data-access'
import { AdminUiLayout } from '@kin-kinetic/admin/ui/layout'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { copyright, links, logo, name } from './admin-shell-constants'

const AdminAppFeature = React.lazy(async () => import('@kin-kinetic/admin/app/feature'))
const AdminSystemFeature = React.lazy(async () => import('@kin-kinetic/admin/system/feature'))

export function AdminShellAuthenticated() {
  const { logout, user } = useAdminAuth()
  return (
    <AdminUiLayout copyright={copyright} name={name} links={links} logo={logo} logout={logout} user={user}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Routes>
          <Route index element={<Navigate to="/apps" />} />
          <Route path="/apps/*" element={<AdminAppFeature />} />
          <Route path="/system/*" element={<AdminSystemFeature />} />
        </Routes>
      </React.Suspense>
    </AdminUiLayout>
  )
}
