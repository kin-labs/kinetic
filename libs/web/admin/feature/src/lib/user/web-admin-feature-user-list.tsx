import { Button } from '@chakra-ui/react'
import { WebAdminUiUserTable } from '@kin-kinetic/web/admin/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminUsersQuery } from '@kin-kinetic/web/util/sdk'
import { Link } from 'react-router-dom'

export function WebAdminFeatureUserList() {
  const [{ data, fetching }] = useAdminUsersQuery()

  return (
    <WebUiPage
      title={'Users'}
      actionRight={
        <Button as={Link} to={'add'}>
          Add User
        </Button>
      }
    >
      <WebUiCard p={'0'}>{fetching ? <WebUiLoader /> : <WebAdminUiUserTable users={data?.items || []} />}</WebUiCard>
    </WebUiPage>
  )
}
