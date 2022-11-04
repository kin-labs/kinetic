import { Stack, useToast } from '@chakra-ui/react'
import {
  WebWebhookUiBalanceForm,
  WebWebhookUiEventForm,
  WebWebhookUiGeneralForm,
  WebWebhookUiVerifyForm,
} from '@kin-kinetic/web/app/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { App, AppEnv, UserAppEnvUpdateInput, useUserUpdateAppEnvMutation } from '@kin-kinetic/web/util/sdk'

export function WebAppEnvSettingsWebhooks({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [, updateAppEnvMutation] = useUserUpdateAppEnvMutation()

  const toastError = (error: string) =>
    toast({
      title: 'Error updating webhooks',
      status: 'error',
      description: `${error}`,
    })

  const onSubmit = (input: UserAppEnvUpdateInput) => {
    return updateAppEnvMutation({
      appId: app.id,
      appEnvId: env.id,
      input,
    })
      .then((res) => {
        if (res.error) {
          return toastError(`${res.error}`)
        }
        return toast({ title: 'Webhooks updated', status: 'success' })
      })
      .catch((error) => toastError(`${error}`))
  }
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebUiCard>
        <WebWebhookUiGeneralForm env={env} onSubmit={onSubmit} />
      </WebUiCard>
      <WebUiCard>
        <WebWebhookUiBalanceForm env={env} onSubmit={onSubmit} />
      </WebUiCard>
      <WebUiCard>
        <WebWebhookUiEventForm env={env} onSubmit={onSubmit} />
      </WebUiCard>
      <WebUiCard>
        <WebWebhookUiVerifyForm env={env} onSubmit={onSubmit} />
      </WebUiCard>
    </Stack>
  )
}
