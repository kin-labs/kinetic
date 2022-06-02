import { AdminAppUiTransactions } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppTransactionsQuery } from '@mogami/shared/util/admin-sdk'
import React, { useEffect } from 'react'

export function AppTransactionsTab({ appId, envId }: { appId: string; envId: string }) {
  const [{ data, fetching }, refresh] = useAppTransactionsQuery({ variables: { appId } })

  useEffect(() => {
    if (!fetching) {
      const id = setTimeout(() => refresh(), 5000)
      return () => clearTimeout(id)
    }
    return
  }, [fetching, refresh])

  if (fetching && !data?.items?.length) {
    return <AdminUiLoader />
  }
  return <AdminAppUiTransactions appId={appId} envId={envId} transactions={data?.items} />
}
