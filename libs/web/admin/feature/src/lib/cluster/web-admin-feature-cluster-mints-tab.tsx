import { useToast } from '@chakra-ui/react'
import { WebAdminUiMintAddForm, WebAdminUiMints } from '@kin-kinetic/web/admin/ui'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { Cluster, Mint, AdminMintCreateInput, useAdminMintCreateMutation } from '@kin-kinetic/web/util/sdk'
import { Maybe } from 'graphql/jsutils/Maybe'

export function WebAdminFeatureClusterMintsTab({ cluster, mints }: { cluster: Cluster; mints: Maybe<Mint[]> }) {
  const toast = useToast()
  const [, addMintMutation] = useAdminMintCreateMutation()
  const addMint = (input: AdminMintCreateInput) => {
    addMintMutation({ input: { ...input, clusterId: cluster.id || '' } })
      .then((res) => {
        if (res?.data?.adminMintCreate) {
          toast({ status: 'success', title: 'Mint Added' })
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
    <WebUiPage title={'Cluster Mints'} actionRight={<WebAdminUiMintAddForm addMint={addMint} />}>
      <WebAdminUiMints clusterId={cluster.id || ''} mints={mints} />
    </WebUiPage>
  )
}
