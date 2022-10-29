import { useToast } from '@chakra-ui/react'
import { WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { WebUiFormModal } from '@kin-kinetic/web/ui/form'
import * as Yup from 'yup'

export function WebServerUiDetail({ addServer }: { addServer: (server: WebServerEntity) => void }) {
  const toast = useToast()
  const schema = Yup.object().shape({
    endpoint: Yup.string().label('Endpoint').meta({ type: 'url' }),
  })

  const onSubmit = ({ endpoint }: Partial<WebServerEntity>) => {
    if (!endpoint) {
      toast({ status: 'error', title: 'Something went wrong' })
      return
    }
    addServer({
      name: endpoint.replace('http://', '').replace('https://', ''),
      endpoint,
    })
    toast({
      status: 'success',
      title: 'Server added!',
      description: `${endpoint}`,
    })
  }
  return (
    <WebUiFormModal<Partial<WebServerEntity>> data={{}} onSubmit={onSubmit} submitLabel="Add Server" schema={schema} />
  )
}
