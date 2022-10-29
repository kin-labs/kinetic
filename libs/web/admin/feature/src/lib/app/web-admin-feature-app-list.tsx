import { Button, useToast } from '@chakra-ui/react'
import { WebAdminUiAppTable } from '@kin-kinetic/web/admin/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminAppsQuery, useAdminDeleteAppMutation } from '@kin-kinetic/web/util/admin-sdk'
import { Link } from 'react-router-dom'

export function WebAdminFeatureAppList() {
  const toast = useToast()
  const [{ data, fetching }] = useAdminAppsQuery()
  const [, deleteAppMutation] = useAdminDeleteAppMutation()
  const deleteApp = (appId: string) => {
    if (!window.confirm('Are you sure?')) return

    deleteAppMutation({ appId })
      .then((res) => {
        if (res.data?.deleted) {
          toast({ status: 'success', title: 'App Deleted' })
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
    <WebUiPage
      title={'Apps'}
      actionRight={
        <Button as={Link} to={'add'}>
          Add App
        </Button>
      }
    >
      <WebUiCard p={'0'}>
        {fetching ? <WebUiLoader /> : <WebAdminUiAppTable apps={data?.items || []} deleteApp={deleteApp} />}
      </WebUiCard>
    </WebUiPage>
  )
}
