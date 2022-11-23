import { Alert, Avatar, Badge, Box, Code, Flex, SimpleGrid, Stack, Text, useToast } from '@chakra-ui/react'
import { KineticSdk, RequestAirdropResponse } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import { WebAppUiWallet } from '@kin-kinetic/web/app/ui'
import { WebToolboxUiCard } from '@kin-kinetic/web/toolbox/ui'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import {
  App,
  AppEnv,
  AppMint,
  useUserGenerateWalletMutation,
  useUserImportWalletMutation,
  useUserWalletsQuery,
  Wallet,
} from '@kin-kinetic/web/util/sdk'
import { Button, ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useEffect, useState } from 'react'

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
    const secret = prompt('Enter mnemonic, secret key or byte array')
    if (!secret) return
    importWalletMutation({ appEnvId: env.id, secret }).then(() => {
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
  const airdrops = env?.mints?.filter((mint) => !!mint.mint?.airdropPublicKey) || []
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
              <WebAppUiWallet
                key={wallet.id}
                appId={app.id}
                appEnvId={env.id}
                wallet={wallet}
                explorerUrl={env?.cluster?.explorer ?? ''}
              />
            ))
          ) : (
            <Alert>No Wallets Found</Alert>
          )}
        </SimpleGrid>

        {airdrops?.length ? (
          <Stack borderWidth="1px" rounded="lg" p={6} spacing={6}>
            <Text fontWeight="semibold" fontSize="lg" lineHeight="tight" noOfLines={1}>
              Mint Airdrops
            </Text>
            <Text>The mints below have airdrops enabled. You can request airdrops for your development wallets.</Text>

            <AirdropToolbox app={app} env={env} />
          </Stack>
        ) : (
          <Alert>No mints with Airdrop configured.</Alert>
        )}
      </Stack>
    </WebUiPage>
  )
}

export function AirdropToolbox({ app, env }: { app: App; env: AppEnv }) {
  const [sdk, setSdk] = useState<KineticSdk | undefined>()
  const airdrops = env?.mints?.filter((mint) => !!mint.mint?.airdropPublicKey) || []

  useEffect(() => {
    KineticSdk.setup({
      endpoint: `${env.endpoint}`,
      environment: `${env.name}`,
      index: app.index,
      logger: console,
    }).then(setSdk)
  }, [])

  if (!sdk) {
    return <WebUiLoader />
  }

  return (
    <Stack>
      {airdrops?.length ? (
        airdrops.map((mint: AppMint) => <AirdropRequestForm sdk={sdk} selectedMint={mint} />)
      ) : (
        <Alert>No mints with Airdrop configured.</Alert>
      )}
    </Stack>
  )
}

export function AirdropRequestForm({ sdk, selectedMint }: { sdk: KineticSdk; selectedMint: AppMint }) {
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<RequestAirdropResponse | undefined>()

  const onSubmit = ({ account, amount }: { account: string; amount: string }) => {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .requestAirdrop({
        account: account,
        amount: amount,
        commitment: Commitment.Confirmed,
        mint: `${selectedMint?.mint?.address}`,
      })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  return (
    <Stack>
      <Flex borderWidth="1px" borderRadius="lg" p={4} align="center">
        <Avatar src={selectedMint?.mint?.logoUrl ?? ''} />
        <Box mx={2}>
          <Flex key={selectedMint?.mint?.name} align="center">
            <Text mr={2}>
              {selectedMint?.mint?.name} ({selectedMint?.mint?.symbol}){' '}
            </Text>
            {selectedMint?.mint?.default && <Badge>Default</Badge>}
          </Flex>
          <Text fontSize="xs">Decimals: {selectedMint?.mint?.decimals}</Text>
          <Flex alignItems="center">
            <Code mr={2} fontSize="sm">
              {selectedMint?.mint?.address}
            </Code>
            <Button
              size="xs"
              as={'a'}
              href={sdk?.getExplorerUrl(`account/${selectedMint?.mint?.address}`)}
              target={'_blank'}
            >
              View on Explorer
            </Button>
          </Flex>
        </Box>
      </Flex>
      <WebToolboxUiCard
        response={response}
        error={error}
        explorer={response?.signature && sdk?.getExplorerUrl(`tx/${response?.signature}`)}
        sdk={sdk}
        signature={response?.signature}
      >
        <Stack>
          <Form
            defaultValues={{
              account: '',
              amount: (selectedMint?.mint?.airdropAmount || '0').toString(),
            }}
            onSubmit={onSubmit}
          >
            <ButtonGroup>
              <Stack direction="row">
                <Field
                  size="lg"
                  name="account"
                  width={280}
                  placeholder="Destination"
                  type="text"
                  rules={{ required: true }}
                />
                <Field size="lg" name="amount" width={70} placeholder="Amount" type="text" rules={{ required: true }} />
                <Box>
                  <SubmitButton isLoading={loading} size="lg">
                    Request Airdrop
                  </SubmitButton>
                </Box>
              </Stack>
            </ButtonGroup>
          </Form>
        </Stack>
      </WebToolboxUiCard>
    </Stack>
  )
}
