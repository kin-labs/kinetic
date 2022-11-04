import { Alert, Flex, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import { WebAppUiWallet } from '@kin-kinetic/web/app/ui'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import {
  App,
  AppEnv,
  useUserGenerateWalletMutation,
  useUserImportWalletMutation,
  useUserWalletsQuery,
  Wallet,
} from '@kin-kinetic/web/util/sdk'
import { Button } from '@saas-ui/react'

export function WebAppEnvWalletsTab({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [{ data, error, fetching }] = useUserWalletsQuery({
    variables: { appEnvId: env.id },
  })
  const [, generateWalletMutation] = useUserGenerateWalletMutation()
  const [, importWalletMutation] = useUserImportWalletMutation()

  const generateWallet = () => {
    generateWalletMutation({ appEnvId: env.id }).then(() => {
      toast({ status: 'success', title: 'Wallet generated' })
    })
  }

  const importWallet = () => {
    const secretKey = prompt('Enter secretKey')
    if (!secretKey) return
    importWalletMutation({ appEnvId: env.id, secretKey }).then(() => {
      toast({ status: 'success', title: 'Wallet imported' })
    })
  }
  if (error) {
    toast({
      status: 'error',
      title: 'Something went wrong',
      description: `${error}`,
    })
  }

  if (fetching) {
    return <WebUiLoader />
  }
  const wallets = data?.items || []
  return (
    <WebUiPage>
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
              <WebAppUiWallet key={wallet.id} appId={app.id} appEnvId={env.id} wallet={wallet} />
            ))
          ) : (
            <Alert>No Wallets Found</Alert>
          )}
        </SimpleGrid>
      </Stack>
    </WebUiPage>
  )
}
