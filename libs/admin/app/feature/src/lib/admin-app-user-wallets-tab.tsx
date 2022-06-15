import { Alert, Box, Button, Flex, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiWallet } from '@kin-kinetic/admin/app/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import {
  useUserAppEnvQuery,
  useUserGenerateWalletMutation,
  useUserImportWalletMutation,
  Wallet,
} from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserWalletsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const toast = useToast()
  const [{ data, fetching }] = useUserAppEnvQuery({ variables: { appId, appEnvId } })
  const [, generateWalletMutation] = useUserGenerateWalletMutation()
  const [, importWalletMutation] = useUserImportWalletMutation()

  const generateWallet = () => {
    generateWalletMutation({ appEnvId }).then(() => {
      toast({ status: 'success', title: 'Wallet generated' })
    })
  }

  const importWallet = () => {
    const secretKey = prompt('Enter secretKey')
    if (!secretKey) return
    importWalletMutation({ appEnvId, secretKey }).then(() => {
      toast({ status: 'success', title: 'Wallet imported' })
    })
  }
  if (fetching) {
    return <AdminUiLoader />
  }
  const wallets = data?.item?.wallets || []
  return (
    <Stack direction="column" spacing={6}>
      <Flex>
        <Button mr={2} onClick={generateWallet}>
          Generate Wallet
        </Button>
        <Button onClick={importWallet}>Import Wallet</Button>
      </Flex>
      {wallets?.length ? (
        wallets.map((wallet: Wallet) => (
          <Box key={wallet.id}>
            {data?.item?.id ? (
              <Stack direction="column" spacing={6}>
                <AdminAppUiWallet appId={appId} appEnvId={data.item.id} wallet={wallet} />
              </Stack>
            ) : null}
          </Box>
        ))
      ) : (
        <Alert>No Wallets Found</Alert>
      )}
    </Stack>
  )
}
