import { Alert, Box, Table, TableContainer, Text, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { AppTransaction } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { AdminAppUiTransactionStatus } from './admin-app-ui-transaction-status'

export interface AdminAppUiTransactionsProps {
  appId: string
  appEnvId: string
  transactions: AppTransaction[] | null | undefined
}

export function AdminAppUiTransactions({ appId, appEnvId, transactions }: AdminAppUiTransactionsProps) {
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
              <Th>Reference</Th>
              <Th isNumeric>Created</Th>
              <Th isNumeric>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions?.map((transaction) => (
              <Tr key={transaction?.id}>
                <Td>
                  <Link to={`/apps/${appId}/environments/${appEnvId}/transactions/${transaction.id}`}>
                    <AdminAppUiTransactionStatus status={transaction?.status} />
                  </Link>
                </Td>
                <Td>
                  <Text fontSize="sm">{transaction.source}</Text>
                </Td>
                <Td>
                  {transaction?.referenceId || transaction?.referenceType
                    ? `${transaction?.referenceType}:${transaction?.referenceId}`
                    : 'None'}
                </Td>
                <Td isNumeric>{transaction.createdAt}</Td>
                <Td isNumeric>{transaction.totalDuration} ms</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
