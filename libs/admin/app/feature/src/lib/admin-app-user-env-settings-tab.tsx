import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiAppEnvMintSettings, AdminAppUiAppEnvWebhookForm } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import {
  AppEnvUpdateInput,
  useUserAppEnvMintDisableMutation,
  useUserAppEnvMintEnableMutation,
  useUserAppEnvMintSetWalletMutation,
  useUserAppEnvQuery,
  useUserUpdateAppEnvMutation,
} from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserEnvSettingsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const toast = useToast()
  const [{ data, fetching }] = useUserAppEnvQuery({ variables: { appId, appEnvId: appEnvId } })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [, updateAppEnvMutation] = useUserUpdateAppEnvMutation()
  const [, disableMintMutation] = useUserAppEnvMintDisableMutation()
  const [, enableMintMutation] = useUserAppEnvMintEnableMutation()
  const [, setWalletMutation] = useUserAppEnvMintSetWalletMutation()
  const onSubmit = async (input: AppEnvUpdateInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const res = await updateAppEnvMutation({
      appId: appId,
      appEnvId: appEnvId,
      input: {
        ...input,
        webhookEventUrl: input.webhookEventUrl?.trim(),
        webhookVerifyUrl: input.webhookVerifyUrl?.trim(),
      },
    })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'Environment updated' })
    }
    if (res?.error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = (res.error.graphQLErrors[0]?.extensions as any).response.message ?? [
        res.error?.message?.toString(),
      ]
      for (const error of errors) {
        toast({
          status: 'error',
          title: 'Environment update failed',
          description: error,
        })
      }
    }
    return res?.data?.updated
  }

  const disableMint = (mintId: string) => {
    disableMintMutation({
      appId,
      appEnvId,
      mintId,
    }).then(() => {
      toast({ status: 'success', title: 'Mint disabled' })
    })
  }
  const enableMint = (mintId: string) => {
    enableMintMutation({
      appId,
      appEnvId,
      mintId,
    }).then(() => {
      toast({ status: 'success', title: 'Mint enabled' })
    })
  }
  const selectWallet = (mintId: string, walletId: string) => {
    setWalletMutation({
      appId,
      appEnvId,
      mintId,
      walletId,
    }).then(() => {
      toast({ status: 'success', title: 'Wallet selected' })
    })
  }
  if (fetching) {
    return <AdminUiLoader />
  }
  return (
    <Stack direction="column" spacing={6}>
      {data?.item ? (
        <Stack direction="column" spacing={6} alignItems={'normal'}>
          <AdminAppUiAppEnvMintSettings
            appEnv={data.item}
            disableMint={disableMint}
            enableMint={enableMint}
            selectWallet={selectWallet}
          />
          <AdminAppUiAppEnvWebhookForm appEnv={data.item} onSubmit={onSubmit} />
        </Stack>
      ) : (
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(data?.item?.mints, null, 2)}
        </Box>
      )}
    </Stack>
  )
}
