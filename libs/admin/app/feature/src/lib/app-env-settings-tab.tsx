import { Box, useToast } from '@chakra-ui/react'
import { AdminAppUiAppEnvWebhookForm } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { AppEnvUpdateInput, useAppEnvQuery, useUpdateAppEnvMutation } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AppEnvSettingsTab({ appId, envId }: { appId: string; envId: string }) {
  const toast = useToast()
  const [{ data, fetching }] = useAppEnvQuery({ variables: { appId, appEnvId: envId } })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [, updateAppEnvMutation] = useUpdateAppEnvMutation()

  const onSubmit = async (input: AppEnvUpdateInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const res = await updateAppEnvMutation({
      appId: appId,
      appEnvId: envId,
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

  if (fetching) {
    return <AdminUiLoader />
  }
  return (
    <div>
      {data?.item ? (
        <AdminAppUiAppEnvWebhookForm appEnv={data.item} onSubmit={onSubmit} />
      ) : (
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(data, null, 2)}
        </Box>
      )}
    </div>
  )
}
