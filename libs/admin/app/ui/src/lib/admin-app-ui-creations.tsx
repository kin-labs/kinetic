import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppCreation } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiCreationsProps {
  appId: string
  creations: AppCreation[] | null | undefined
}

export function AdminAppUiCreations({ appId, creations }: AdminAppUiCreationsProps) {
  if (!creations?.length) {
    return <Alert>No creations found.</Alert>
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Source</Th>
            </Tr>
          </Thead>
          <Tbody>
            {creations?.map((creation) => (
              <Tr key={creation?.id}>
                <Td>
                  <Link to={`/apps/${appId}/creations/${creation.id}`}>
                    <Text color="teal.500">{creation.status}</Text>
                  </Link>
                </Td>
                <Td>{creation.source}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
