import { Alert, Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiWallet, AdminAppUiWalletBalances } from '@kin-kinetic/admin/app/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useUserWalletQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserWalletTab({
  appId,
  appEnvId,
  walletId,
}: {
  appId: string
  appEnvId: string
  walletId: string
}) {
  const toast = useToast()
  const [{ data, error, fetching }] = useUserWalletQuery({ variables: { appEnvId, walletId } })

  if (fetching) {
    return <AdminUiLoader />
  }
  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  const wallet = data?.item

  return (
    <Stack direction="column" spacing={6}>
      {wallet?.id ? (
        <Box key={wallet.id}>
          {wallet?.id ? (
            <Stack direction="column" spacing={6}>
              <AdminAppUiWallet appEnvId={appEnvId} appId={appId} wallet={wallet} />
              <AdminAppUiWalletBalances appEnvId={appEnvId} wallet={wallet} />
            </Stack>
          ) : null}
        </Box>
      ) : (
        <Alert>Wallet not found</Alert>
      )}
    </Stack>
  )
}
