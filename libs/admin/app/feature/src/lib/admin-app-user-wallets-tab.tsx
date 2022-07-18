import { Alert, Box, Button, Flex, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiWallet } from '@kin-kinetic/admin/app/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import {
  useUserAppEnvQuery,
  useUserGenerateWalletMutation,
  useUserImportWalletMutation,
  useUserWalletsQuery,
  Wallet,
} from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserWalletsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const toast = useToast()
  const [{ data, error, fetching }] = useUserWalletsQuery({ variables: { appEnvId } })
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
  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }
  const wallets = data?.items || []
  return (
    <Stack direction="column" spacing={6}>
      <Flex>
        <Button mr={2} onClick={generateWallet}>
          Generate Wallet
        </Button>
        <Button onClick={importWallet}>Import Wallet</Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {wallets?.length ? (
          wallets.map((wallet: Wallet) => (
            <AdminAppUiWallet key={wallet.id} appId={appId} appEnvId={appEnvId} wallet={wallet} />
          ))
        ) : (
          <Alert>No Wallets Found</Alert>
        )}
      </SimpleGrid>
    </Stack>
  )
}
