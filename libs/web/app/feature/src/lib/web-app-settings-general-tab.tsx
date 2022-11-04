import { Stack, useToast } from '@chakra-ui/react'
import { WebAppUiAppForm } from '@kin-kinetic/web/app/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { App, UserAppUpdateInput, useUserUpdateAppMutation } from '@kin-kinetic/web/util/sdk'
import { CardHeader, CardTitle } from '@saas-ui/react'

export function WebAppSettingsGeneralTab({ app }: { app: App }) {
  const toast = useToast()
  const [, updateApp] = useUserUpdateAppMutation()
  const submit = (data: UserAppUpdateInput) => {
    updateApp({
      appId: app.id,
      input: { name: data.name, logoUrl: data.logoUrl },
    })
      .then(() => {
        toast({ status: 'success', title: 'App saved' })
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        })
      })
  }
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebUiCard>
        <CardHeader>
          <CardTitle fontSize="xl" mr={'2'}>
            General
          </CardTitle>
        </CardHeader>
      </WebUiCard>
      <WebUiCard p={0}>
        <WebAppUiAppForm app={app} onSubmit={submit} />
      </WebUiCard>
    </Stack>
  )
}
