import { Alert, Box } from '@chakra-ui/react'
import { AdminAppUiWallet, AdminAppUiWalletBalances } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useUserAppEnvQuery, Wallet } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AppWalletsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const [{ data, fetching }] = useUserAppEnvQuery({ variables: { appId, appEnvId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return (
    <Box>
      {data?.item?.wallets?.length ? (
        data?.item?.wallets.map((wallet: Wallet) => (
          <Box key={wallet.id}>
            {data?.item?.id ? (
              <>
                <AdminAppUiWallet appEnvId={data.item.id} wallet={wallet} />
                <AdminAppUiWalletBalances appEnvId={data.item.id} wallet={wallet} />
              </>
            ) : null}
          </Box>
        ))
      ) : (
        <Alert>No Wallets Found</Alert>
      )}
    </Box>
  )
}
