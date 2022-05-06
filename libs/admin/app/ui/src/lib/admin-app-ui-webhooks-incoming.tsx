import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppWebhookIncoming } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiWebhooksIncomingProps {
  appId: string
  webhooks: AppWebhookIncoming[] | null | undefined
}

export function AdminAppUiWebhooksIncoming({ appId, webhooks }: AdminAppUiWebhooksIncomingProps) {
  if (!webhooks?.length) {
    return <Alert>No webhooks found.</Alert>
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
            {webhooks?.map((webhook) => (
              <Tr key={webhook?.id}>
                <Td>
                  <Link to={`/apps/${appId}/webhook-incoming/${webhook.id}`}>
                    <Text color="teal.500">{webhook.id}</Text>
                  </Link>
                </Td>
                <Td>{webhook.type}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
