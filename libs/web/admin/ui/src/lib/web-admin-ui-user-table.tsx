import { HStack } from '@chakra-ui/react'
import { WebUiAppAvatar } from '@kin-kinetic/web/ui/app-avatar'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiDataTable, WebUiDataTableLink } from '@kin-kinetic/web/ui/table'
import { User } from '@kin-kinetic/web/util/admin-sdk'
import { CellProps } from 'react-table'

export function WebAdminUiUserTable({ users }: { users: User[] }) {
  if (!users.length) {
    return <WebUiAlert message="No users found" />
  }
  return (
    <WebUiDataTable<User>
      data={users}
      columns={[
        {
          accessor: 'name',
          Header: 'Name',
          Cell: ({ row, value }: CellProps<User>) => (
            <HStack spacing={4}>
              <WebUiAppAvatar logoUrl={row.original?.avatarUrl} size={'sm'} />
              <WebUiDataTableLink to={row.original.id} value={value} />
            </HStack>
          ),
        },
        {
          accessor: 'role',
          Header: 'Role',
        },
      ]}
    />
  )
}
