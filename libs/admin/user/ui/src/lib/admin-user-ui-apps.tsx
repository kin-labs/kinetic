import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { AppUser } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminUserUiAppsProps {
  apps: AppUser[] | null | undefined
}

export function AdminUserUiApps({ apps }: AdminUserUiAppsProps) {
  if (!apps?.length) {
    return <Alert>No apps found.</Alert>
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {apps?.map((app) => (
              <Tr key={app?.id}>
                <Td>
                  <Link to={'/apps/' + app?.app?.id}>
                    <Text color="teal.500">
                      {app?.app?.name} ({app?.app?.index})
                    </Text>
                  </Link>
                </Td>
                <Td isNumeric>
                  <Text color="teal.500">{app?.role}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th />
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}
