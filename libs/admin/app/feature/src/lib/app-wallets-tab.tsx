import { Alert, Box } from '@chakra-ui/react'
import { AdminAppUiWallet, AdminAppUiWalletBalances } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppQuery, Wallet } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AppWalletsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return (
    <Box>
      {data?.item?.wallets?.length ? (
        data?.item?.wallets.map((wallet: Wallet) => (
          <Box key={wallet.id}>
            <AdminAppUiWallet wallet={wallet} />
            <AdminAppUiWalletBalances wallet={wallet} />
          </Box>
        ))
      ) : (
        <Alert>No Wallets Found</Alert>
      )}
    </Box>
  )
}
