import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppTransaction } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiTransactionsProps {
  appId: string
  transactions: AppTransaction[] | null | undefined
}

export function AdminAppUiTransactions({ appId, transactions }: AdminAppUiTransactionsProps) {
  if (!transactions?.length) {
    return <Alert>No transactions found.</Alert>
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
            {transactions?.map((transaction) => (
              <Tr key={transaction?.id}>
                <Td>
                  <Link to={`/apps/${appId}/transactions/${transaction.id}`}>
                    <Text color="teal.500">{transaction.status}</Text>
                  </Link>
                </Td>
                <Td>{transaction.source}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
