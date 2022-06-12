import { Button, Code, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { App } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiTableProps {
  apps: App[] | null | undefined
  deleteApp: (appId: string) => void
}

export function AdminAppUiTable({ apps, deleteApp }: AdminAppUiTableProps) {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th isNumeric>Index</Th>
            <Th>Name</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {apps?.map((app) => (
            <Tr key={app.id}>
              <Td isNumeric>{app.index}</Td>
              <Td>
                <Link to={'/apps/' + app.id}>
                  <Text color="teal.500">{app.name}</Text>
                </Link>
              </Td>
              <Td isNumeric>
                <Button size="xs" onClick={() => deleteApp(app.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
