import { useAdminAuth } from '@mogami/admin/auth/data-access'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import React from 'react'
import { AdminShellAnonymous } from './admin-shell-anonymous'
import { AdminShellAuthenticated } from './admin-shell-authenticated'

export function AdminShellAuthGuard() {
  const { loading, user } = useAdminAuth()

  if (loading) {
    return <AdminUiLoader />
  }

  if (!user) {
    return <AdminShellAnonymous />
  }

  return <AdminShellAuthenticated />
}
