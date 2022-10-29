import { useToast } from '@chakra-ui/react'
import { WebAdminUiAppUpdateForm } from '@kin-kinetic/web/admin/ui'
import { AdminAppUpdateInput, App, useAdminUpdateAppMutation } from '@kin-kinetic/web/util/admin-sdk'

export function WebAdminFeatureAppUpdate({ app }: { app: App }) {
  const toast = useToast()
  const [, createApp] = useAdminUpdateAppMutation()
  const submit = async (input: AdminAppUpdateInput) => {
    createApp({ appId: app.id, input })
      .then((res) => {
        if (res.data?.updated) {
          toast({ status: 'success', title: 'App updated.' })
        } else {
          toast({
            status: 'error',
            title: 'Something went wrong',
            description: `${res.error}`,
          })
        }
      })
      .catch((error) =>
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        }),
      )
  }

  return <WebAdminUiAppUpdateForm app={app} onSubmit={submit} />
}
