import { Flex, HStack } from '@chakra-ui/react'
import { WebUiAppAvatar } from '@kin-kinetic/web/ui/app-avatar'
import { WebUiDataTable, WebUiDataTableLink } from '@kin-kinetic/web/ui/table'
import { App } from '@kin-kinetic/web/util/admin-sdk'
import { IconButton } from '@saas-ui/react'
import { MdDelete } from 'react-icons/md'
import { CellProps } from 'react-table'

export function WebAdminUiAppTable({ apps, deleteApp }: { apps: App[]; deleteApp: (id: string) => void }) {
  return (
    <WebUiDataTable<App>
      data={apps}
      columns={[
        {
          accessor: 'name',
          Header: 'Name',
          Cell: ({ row, value }: CellProps<App>) => (
            <HStack spacing={4}>
              <WebUiAppAvatar logoUrl={row.original?.logoUrl} size={'sm'} />
              <WebUiDataTableLink to={row.original.id} value={value} />
            </HStack>
          ),
        },
        {
          accessor: 'index',
          Header: 'Index',
        },
        {
          accessor: 'id',
          Header: '',
          Cell: ({ value }: { value: string }) => (
            <Flex justifyContent="end">
              <IconButton onClick={() => deleteApp(value)} aria-label={'Delete App'} icon={<MdDelete />}></IconButton>
            </Flex>
          ),
        },
      ]}
    />
  )
}
