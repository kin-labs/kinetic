import { Box, Button, Code, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { App } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiTableProps {
  apps: App[] | null | undefined
  deleteApp: (appId: string) => void
}

export function AdminAppUiTable({ apps, deleteApp }: AdminAppUiTableProps) {
  if (!apps?.length) {
    return <AdminUiAlert message="No apps found" />
  }
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th isNumeric>#</Th>
            <Th>Name</Th>
            <Th>Environment</Th>
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
              <Td>
                {app.envs?.map((env) => (
                  <Box>
                    <Text>{env?.name}</Text>
                    {env?.domains?.map((domain) => (
                      <Code colorScheme="teal">{domain?.hostname}</Code>
                    ))}
                  </Box>
                ))}
              </Td>
              <Td isNumeric>
                <Button size="xs" onClick={() => deleteApp(app.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th isNumeric>#</Th>
            <Th>Name</Th>
            <Th>Environment</Th>
            <Th />
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
