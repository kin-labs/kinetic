import { useToast } from '@chakra-ui/react'
import { WebAdminUiClusterCreateForm } from '@kin-kinetic/web/admin/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPage, WebUiPageBackButton } from '@kin-kinetic/web/ui/page'
import { AdminClusterCreateInput, useAdminCreateClusterMutation } from '@kin-kinetic/web/util/sdk'
import { useNavigate } from 'react-router-dom'

export function WebAdminFeatureClusterAdd() {
  const toast = useToast()
  const navigate = useNavigate()
  const [, createCluster] = useAdminCreateClusterMutation()
  const submit = async (input: AdminClusterCreateInput) => {
    console.log({ input })
    createCluster({ input })
      .then((res) => {
        if (res.data?.created) {
          toast({ status: 'success', title: 'Cluster created.' })
          navigate(`../${res?.data?.created?.id}`)
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

  return (
    <WebUiPage title={'Add Cluster'} actionLeft={<WebUiPageBackButton />}>
      <WebUiCard>
        <WebAdminUiClusterCreateForm onSubmit={submit} />
      </WebUiCard>
    </WebUiPage>
  )
}
