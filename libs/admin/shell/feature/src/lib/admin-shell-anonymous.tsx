import { AdminUiLayout } from '@mogami/admin/ui/layout'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { copyright, name } from './admin-shell-constants'

const AdminAuthFeature = React.lazy(async () => import('@mogami/admin/auth/feature'))

export function AdminShellAnonymous() {
  return (
    <AdminUiLayout copyright={copyright} name={name}>
      <React.Suspense fallback={<AdminUiLoader />}>
        <Routes>
          <Route path="**" element={<AdminAuthFeature />} />
        </Routes>
      </React.Suspense>
    </AdminUiLayout>
  )
}
