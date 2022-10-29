import { WebUiDataTable, WebUiDataTableLink } from '@kin-kinetic/web/ui/table'
import { Cluster } from '@kin-kinetic/web/util/sdk'
import { CellProps } from 'react-table'

export function WebAdminUiClusterTable({ clusters }: { clusters: Cluster[] }) {
  return (
    <WebUiDataTable<Cluster>
      data={clusters}
      columns={[
        {
          accessor: 'name',
          Header: 'Name',
          Cell: ({ row, value }: CellProps<Cluster>) => <WebUiDataTableLink to={row.original.id || ''} value={value} />,
        },
        {
          accessor: 'type',
          Header: 'Type',
        },
        {
          accessor: 'status',
          Header: 'Status',
        },
      ]}
    />
  )
}
