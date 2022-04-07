import { AdminAuthProvider } from '@mogami/admin/auth/data-access'
import { createGraphqlClient } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Provider } from 'urql'
import { AdminShellAuthGuard } from './admin-shell-auth-guard'

const client = createGraphqlClient()

export function AdminShellFeature() {
  return (
    <Provider value={client}>
      <AdminAuthProvider>
        <AdminShellAuthGuard />
      </AdminAuthProvider>
    </Provider>
  )
}
