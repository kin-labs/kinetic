import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export interface WebUiTableColumn<T> {
  key: keyof T
  isNumeric?: boolean
  label: string
  render?: (tx: T) => ReactNode
  width?: string
}

export function tableColumn<T>(
  key: keyof T,
  label: string,
  options: Omit<WebUiTableColumn<T>, 'key' | 'label'> = {},
): WebUiTableColumn<T> {
  return {
    key,
    label,
    ...options,
  }
}

export function WebUiTable<T extends { id?: string | null | undefined; [key: string]: unknown }>({
  data,
  columns,
}: {
  data: T[]
  columns: WebUiTableColumn<T>[]
}) {
  const navigate = useNavigate()
  const rowBgColor = useColorModeValue('primary.100', 'whiteAlpha.100')

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <WebUiTableHeader<T> columns={columns} />
        </Thead>
        <Tbody>
          {data.map((item: T) => (
            <Tr
              onClick={() => navigate(item.id || '')}
              key={item.id}
              _hover={{
                background: rowBgColor,
                cursor: 'pointer',
              }}
            >
              {columns.map((field) => (
                <Td key={field.key as string} width={field.width} p={2}>
                  {field.render ? field.render(item) : (item[field.key as string] as ReactNode)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <WebUiTableHeader<T> columns={columns} />
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

function WebUiTableHeader<T>({ columns }: { columns: WebUiTableColumn<T>[] }) {
  return (
    <Tr>
      {columns?.map((field) => (
        <Th isNumeric={field.isNumeric} key={field.label} p={2}>
          {field.label}
        </Th>
      ))}
    </Tr>
  )
}
