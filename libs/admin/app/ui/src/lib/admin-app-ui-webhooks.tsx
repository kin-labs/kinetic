import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { AppWebhook } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiWebhooksProps {
  appId: string
  appEnvId: string
  webhooks: AppWebhook[] | null | undefined
}

export function AdminAppUiWebhooks({ appId, appEnvId, webhooks }: AdminAppUiWebhooksProps) {
  if (!webhooks?.length) {
    return <Alert>No webhooks found.</Alert>
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Direction</Th>
              <Th>Type</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {webhooks?.map((webhook) => (
              <Tr key={webhook?.id}>
                <Td>
                  <Link to={`/apps/${appId}/environments/${appEnvId}/webhooks/${webhook.id}`}>
                    <Text color="teal.500">{webhook.id}</Text>
                  </Link>
                </Td>
                <Td>{webhook.direction}</Td>
                <Td>{webhook.type}</Td>
                <Td>{webhook.responseStatus}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
