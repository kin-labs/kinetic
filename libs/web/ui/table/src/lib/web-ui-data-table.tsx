import { Column, DataTable } from '@saas-ui/react'

export interface WebUiDataTableProps<T extends object> {
  columns: Column<T>[]
  data: T[]
}

export function WebUiDataTable<T extends object>({ columns, data }: WebUiDataTableProps<T>) {
  return <DataTable<T> columns={columns} data={data} />
}
