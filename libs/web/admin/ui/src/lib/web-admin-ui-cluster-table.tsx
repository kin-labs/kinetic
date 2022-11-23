import { Stack, Tag } from '@chakra-ui/react'
import { WebUiDataTable, WebUiDataTableLink } from '@kin-kinetic/web/ui/table'
import { Cluster } from '@kin-kinetic/web/util/sdk'
import { Button } from '@saas-ui/react'
import { Link } from 'react-router-dom'
import { CellProps } from 'react-table'

export function WebAdminUiClusterTable({
  clusters,
  deleteCluster,
}: {
  clusters: Cluster[]
  deleteCluster: (clusterId: string) => void
}) {
  return (
    <WebUiDataTable<Cluster>
      data={clusters}
      columns={[
        {
          accessor: 'name',
          Header: 'Name',
          Cell: ({ row, value }: CellProps<Cluster>) => <WebUiDataTableLink to={`${row.original.id}`} value={value} />,
        },
        {
          accessor: 'type',
          Header: 'Type',
        },
        {
          accessor: 'envs',
          Header: 'Environments',
          Cell: ({ row }: CellProps<Cluster>) => (
            <Stack>
              {row.original?.envs?.map((e) => (
                <Tag
                  as={Link}
                  to={`/apps/${e?.app?.id}/environments/${e.id}`}
                  key={e?.key}
                  size="sm"
                  variant="subtle"
                  colorScheme="primary"
                >
                  {e.key}
                </Tag>
              ))}
            </Stack>
          ),
        },
        {
          accessor: 'status',
          Header: 'Status',
        },
        {
          accessor: 'id',
          Header: 'Actions',
          Cell: ({ row }: CellProps<Cluster>) => (
            <Button disabled={!!row.original?.envs?.length} onClick={() => deleteCluster(`${row.original.id}`)}>
              Delete
            </Button>
          ),
        },
      ]}
    />
  )
}
