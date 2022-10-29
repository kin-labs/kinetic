import { Button } from '@chakra-ui/react'
import { WebAdminUiClusterTable } from '@kin-kinetic/web/admin/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminClustersQuery } from '@kin-kinetic/web/util/sdk'
import { Link } from 'react-router-dom'

export function WebAdminFeatureClusterList() {
  const [{ data, fetching }] = useAdminClustersQuery()

  return (
    <WebUiPage
      title={'Clusters'}
      actionRight={
        <Button as={Link} to={'add'}>
          Add Cluster
        </Button>
      }
    >
      <WebUiCard p={'0'}>
        {fetching ? <WebUiLoader /> : <WebAdminUiClusterTable clusters={data?.items || []} />}
      </WebUiCard>
    </WebUiPage>
  )
}
