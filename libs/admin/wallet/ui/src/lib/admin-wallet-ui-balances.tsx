import { Alert, Box, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { WalletBalance } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export interface AdminWalletUiAppsProps {
  balances: WalletBalance[] | null | undefined
}

export function AdminWalletUiBalances({ balances }: AdminWalletUiAppsProps) {
  if (!balances?.length) {
    return <Alert>No apps found.</Alert>
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {balances?.map((balance) => (
              <Tr key={balance?.id}>
                <Td>
                  <Box as="pre" fontSize="xs" color="gray.500">
                    {JSON.stringify(balance, null, 2)}
                  </Box>
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
