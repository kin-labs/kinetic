import { AdminUiLayout } from '@kin-kinetic/admin/ui/layout'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { copyright, logo, name } from './admin-shell-constants'

const AdminAuthFeature = React.lazy(async () => import('@kin-kinetic/admin/auth/feature'))

export function AdminShellAnonymous() {
  return (
    <AdminUiLayout copyright={copyright} logo={logo} name={name}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Routes>
          <Route index element={<AdminAuthFeature />} />
        </Routes>
      </React.Suspense>
    </AdminUiLayout>
  )
}
