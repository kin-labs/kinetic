import { HStack } from '@chakra-ui/react'
import { WebUiAppAvatar } from '@kin-kinetic/web/ui/app-avatar'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiDataTable, WebUiDataTableLink } from '@kin-kinetic/web/ui/table'
import { AppUser } from '@kin-kinetic/web/util/admin-sdk'
import { CellProps } from 'react-table'

export function WebAdminUiUserAppTable({ apps }: { apps: AppUser[] }) {
  if (!apps.length) {
    return <WebUiAlert message="No apps found" status="info" />
  }
  return (
    <WebUiDataTable<AppUser>
      data={apps}
      columns={[
        {
          accessor: 'app',
          Header: 'App',
          Cell: ({ row, value }: CellProps<AppUser>) => (
            <HStack spacing={4}>
              <WebUiAppAvatar logoUrl={row.original?.app?.logoUrl} size={'sm'} />
              <WebUiDataTableLink to={`/admin/apps/${value.id}`} value={value.name as string} />
            </HStack>
          ),
        },
        {
          accessor: 'role',
          Header: 'Role',
          Cell: ({ value }: CellProps<AppUser>) => value,
        },
      ]}
    />
  )
}
