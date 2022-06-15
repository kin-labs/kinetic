import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Alert, Box, Table, TableContainer, Text, Tbody, Td, Th, Thead, Tr, Link, Flex } from '@chakra-ui/react'
import { AppTransaction } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
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
                  <RouterLink to={`/apps/${appId}/environments/${appEnvId}/transactions/${transaction.id}`}>
                    <AdminAppUiTransactionStatus status={transaction?.status} />
                  </RouterLink>
                </Td>
                <Td>
                  <Flex alignItems="center">
                    {transaction?.explorerUrl && transaction?.signature && (
                      <Link mr={2} target="_blank" href={transaction?.explorerUrl}>
                        <ExternalLinkIcon />
                      </Link>
                    )}
                    <Text fontSize="sm">{transaction.source}</Text>
                  </Flex>
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
