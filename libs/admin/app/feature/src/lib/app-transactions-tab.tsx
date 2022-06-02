import { AdminAppUiTransactions } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppTransactionsQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AppTransactionsTab({ appId, envId }: { appId: string; envId: string }) {
  const [{ data, fetching }] = useAppTransactionsQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiTransactions appId={appId} envId={envId} transactions={data?.items} />
}
