import { UseDisclosureReturn, useToast } from '@chakra-ui/react'
import { WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { WebUiFormModal } from '@kin-kinetic/web/ui/form'
import * as Yup from 'yup'

export function WebServerUiSettingsForm({
  disclosure,
  server,
  updateServer,
}: {
  disclosure: UseDisclosureReturn
  server: WebServerEntity
  updateServer: (server: WebServerEntity) => void
}) {
  const toast = useToast()
  const schema = Yup.object().shape({
    name: Yup.string().label('Name'),
    endpoint: Yup.string().label('Endpoint').meta({ type: 'url' }),
  })

  const onSubmit = ({ name, endpoint }: Partial<WebServerEntity>) => {
    if (!endpoint) {
      toast({ status: 'error', title: 'Something went wrong' })
      return
    }
    updateServer({ id: server.id, name: name || endpoint, endpoint })
    toast({
      status: 'success',
      title: 'Server updated!',
      description: `${endpoint}`,
    })
  }
  return (
    <WebUiFormModal<Partial<WebServerEntity>>
      button={false}
      data={{ ...server }}
      disclosure={disclosure}
      onSubmit={onSubmit}
      schema={schema}
      submitLabel="Save"
      title="Server Settings"
    />
  )
}
