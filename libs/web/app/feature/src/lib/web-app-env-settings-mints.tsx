import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { WebAppUiMintDisabledPanel, WebAppUiMintEnabledPanel } from '@kin-kinetic/web/app/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPageHeader } from '@kin-kinetic/web/ui/page'
import {
  App,
  AppEnv,
  UserAppMintUpdateInput,
  useUserAppEnvMintDisableMutation,
  useUserAppEnvMintEnableMutation,
  useUserAppEnvMintSetWalletMutation,
  useUserAppEnvQuery,
  useUserUpdateAppMintMutation,
} from '@kin-kinetic/web/util/sdk'
import { WebhookLabel } from './web-app-env-settings-webhooks'

export function WebAppEnvSettingsMints({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [{ data, fetching }] = useUserAppEnvQuery({
    variables: { appId: app.id, appEnvId: env.id },
  })
  const [, updateAppMintMutation] = useUserUpdateAppMintMutation()
  const [, disableMintMutation] = useUserAppEnvMintDisableMutation()
  const [, enableMintMutation] = useUserAppEnvMintEnableMutation()
  const [, setWalletMutation] = useUserAppEnvMintSetWalletMutation()

  const enabledMintIds = data?.item?.mints?.map((mint) => mint.mint).map((mint) => `${mint?.id}`) || []
  const availableMints = data?.item?.cluster?.mints?.filter((mint) => !enabledMintIds?.includes(`${mint?.id}`))

  const disableMint = (mintId: string) => {
    disableMintMutation({
      appId: app.id,
      appEnvId: env.id,
      mintId,
    }).then(() => toast({ status: 'success', title: 'Mint disabled' }))
  }

  const updateAppMint = (appMintId: string, input: UserAppMintUpdateInput) => {
    updateAppMintMutation({ appId: app.id, appMintId, input }).then(() =>
      toast({
        status: 'success',
        title: 'Mint updated',
      }),
    )
  }
  const enableMint = (mintId: string) => {
    enableMintMutation({
      appId: app.id,
      appEnvId: env.id,
      mintId,
    }).then(() => toast({ status: 'success', title: 'Mint enabled' }))
  }
  const selectWallet = (mintId: string, walletId: string) => {
    setWalletMutation({
      appId: app.id,
      appEnvId: env.id,
      mintId,
      walletId,
    }).then(() => toast({ status: 'success', title: 'Fee Payer updated' }))
  }

  if (fetching) {
    return <WebUiLoader />
  }

  if (!data?.item) {
    return <WebUiAlert status="error" message="App not found" />
  }

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Flex justify="space-between" align="start">
        <Box>
          <WebUiPageHeader title="Mints" />
          <Text ml={2} mt={2} color="gray.500">
            Here you can control the mints that are available to your app.
          </Text>
          <Text ml={2} mt={2} color="gray.500" fontWeight="bold">
            Be cautious when changing the mint settings. If you disable an existing mint, users will no longer be able
            to interact with that mint through your app. After changing the fee payer, users will need to restart their
            apps so that the SDK can pick up the app config with new fee payer.
          </Text>
        </Box>
        <Box mt={2} />
      </Flex>
      <WebUiCard px={2}>
        <Accordion defaultIndex={[...enabledMintIds.map((_, i) => i)]} allowMultiple>
          {data?.item?.mints?.map((appMint) => (
            <AccordionItem key={appMint.id}>
              <AccordionButton alignItems="center">
                <WebhookLabel title={<Text>{appMint?.mint?.name ?? ''}</Text>} enabled={true} />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {appMint?.mint ? (
                  <WebAppUiMintEnabledPanel
                    appMint={appMint}
                    wallets={data?.item?.wallets ?? []}
                    disableMint={disableMint}
                    selectWallet={selectWallet}
                    updateAppMint={updateAppMint}
                  />
                ) : null}
              </AccordionPanel>
            </AccordionItem>
          ))}

          {availableMints?.map((mint) => (
            <AccordionItem key={mint.id}>
              <AccordionButton alignItems="center">
                <WebhookLabel title={<Text>{mint?.name ?? ''}</Text>} enabled={false} />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {mint ? <WebAppUiMintDisabledPanel mint={mint} enableMint={enableMint} /> : null}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </WebUiCard>
    </Stack>
  )
}
