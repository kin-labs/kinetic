import { Alert, Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { AppTransaction } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { AdminAppUiTransactionStatus } from './admin-app-ui-transaction-status'

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
              <Th isNumeric>Created</Th>
              <Th isNumeric>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions?.map((transaction) => (
              <Tr key={transaction?.id}>
                <Td>
                  <Link to={`/apps/${appId}/transactions/${transaction.id}`}>
                    <AdminAppUiTransactionStatus status={transaction?.status} />
                  </Link>
                </Td>
                <Td>{transaction.source}</Td>
                <Td isNumeric>{transaction.createdAt} ms</Td>
                <Td isNumeric>{transaction.totalDuration} ms</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
