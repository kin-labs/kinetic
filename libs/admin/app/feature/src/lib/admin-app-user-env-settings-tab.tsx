import { Box, Stack, useToast } from '@chakra-ui/react'
import {
  AdminAppUiAppEnvAllowedIpsForm,
  AdminAppUiAppEnvBlockedIpsForm,
  AdminAppUiAppEnvBlockedUasForm,
  AdminAppUiAppEnvAllowedUasForm,
  AdminAppUiAppEnvMintSettings,
  AdminAppUiAppEnvWebhookForm,
} from '@kin-kinetic/admin/app/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import {
  AppEnvUpdateInput,
  AppMintUpdateInput,
  useUserAppEnvMintDisableMutation,
  useUserAppEnvMintEnableMutation,
  useUserAppEnvMintSetWalletMutation,
  useUserAppEnvQuery,
  useUserUpdateAppEnvMutation,
  useUserUpdateAppMintMutation,
} from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserEnvSettingsTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const toast = useToast()
  const [{ data, fetching }] = useUserAppEnvQuery({ variables: { appId, appEnvId: appEnvId } })
  const [, updateAppEnvMutation] = useUserUpdateAppEnvMutation()
  const [, updateAppMintMutation] = useUserUpdateAppMintMutation()
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
  const updateAppMint = (appMintId: string, input: AppMintUpdateInput) => {
    updateAppMintMutation({ appId, appMintId, input }).then(() => {
      toast({ status: 'success', title: 'Mint updated' })
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
      toast({ status: 'success', title: 'Fee Payer updated' })
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
            updateAppMint={updateAppMint}
          />
          <AdminAppUiAppEnvWebhookForm appEnv={data.item} onSubmit={onSubmit} />
          <AdminAppUiAppEnvAllowedIpsForm appEnv={data.item} />
          <AdminAppUiAppEnvBlockedIpsForm appEnv={data.item} />
          <AdminAppUiAppEnvAllowedUasForm appEnv={data.item} />
          <AdminAppUiAppEnvBlockedUasForm appEnv={data.item} />
        </Stack>
      ) : (
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(data?.item?.mints, null, 2)}
        </Box>
      )}
    </Stack>
  )
}
