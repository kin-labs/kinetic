import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppPayment } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiPaymentsProps {
  appId: string
  payments: AppPayment[] | null | undefined
}

export function AdminAppUiPayments({ appId, payments }: AdminAppUiPaymentsProps) {
  if (!payments?.length) {
    return <Alert>No payments found.</Alert>
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
            {payments?.map((payment) => (
              <Tr key={payment?.id}>
                <Td>
                  <Link to={`/apps/${appId}/payments/${payment.id}`}>
                    <Text color="teal.500">{payment.status}</Text>
                  </Link>
                </Td>
                <Td>{payment.source}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
