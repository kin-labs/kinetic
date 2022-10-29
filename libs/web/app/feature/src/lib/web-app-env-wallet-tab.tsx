import { Alert, Box, Stack, useToast } from '@chakra-ui/react'
import { WebAppUiWallet } from '@kin-kinetic/web/app/ui'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPageFull } from '@kin-kinetic/web/ui/page'
import { App, AppEnv, useUserWalletQuery } from '@kin-kinetic/web/util/sdk'
import { useParams } from 'react-router-dom'

export function WebAppEnvWalletTab({ app, env }: { app: App; env: AppEnv }) {
  const { walletId } = useParams<{ walletId: string }>()
  const toast = useToast()
  const [{ data, error, fetching }] = useUserWalletQuery({
    variables: { appEnvId: `${env.id}`, walletId: `${walletId}` },
  })

  if (fetching) {
    return <WebUiLoader />
  }
  if (error) {
    toast({
      status: 'error',
      title: 'Something went wrong',
      description: `${error}`,
    })
  }

  const wallet = data?.item

  return (
    <WebUiPageFull title="Back to wallets" to="../wallets">
      <Stack direction="column" spacing={6}>
        {wallet?.id ? (
          <Box key={wallet.id}>
            {wallet?.id ? (
              <Stack direction="column" spacing={6}>
                <WebAppUiWallet appEnvId={env.id} appId={app.id} wallet={wallet} />
              </Stack>
            ) : null}
          </Box>
        ) : (
          <Alert>Wallet not found</Alert>
        )}
      </Stack>
    </WebUiPageFull>
  )
}
