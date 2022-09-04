import { Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiTransactionFilter, AdminAppUiTransactions } from '@kin-kinetic/admin/app/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { UserAppTransactionListInput, useUserAppTransactionsQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React, { useEffect, useState } from 'react'

export function AdminAppUserTransactionsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const toast = useToast()
  const [input, setInput] = useState<UserAppTransactionListInput>({})
  const [{ data, error, fetching }, refresh] = useUserAppTransactionsQuery({ variables: { appId, appEnvId, input } })

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  useEffect(() => {
    if (!fetching && !error) {
      const id = setTimeout(() => refresh(), 5000)
      return () => clearTimeout(id)
    }
    return
  }, [fetching, refresh])

  if (fetching && !data?.items?.length) {
    return <AdminUiLoader />
  }
  return (
    <Stack direction="column" spacing={6}>
      <AdminAppUiTransactionFilter input={input} onSubmit={setInput} />
      <AdminAppUiTransactions appId={appId} appEnvId={appEnvId} transactions={data?.items} />
    </Stack>
  )
}
