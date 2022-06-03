import { AdminAppUiTransactions } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppTransactionsQuery } from '@mogami/shared/util/admin-sdk'
import React, { useEffect } from 'react'

export function AppTransactionsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const [{ data, fetching }, refresh] = useAppTransactionsQuery({ variables: { appId, appEnvId } })

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
  return <AdminAppUiTransactions appId={appId} appEnvId={appEnvId} transactions={data?.items} />
}
