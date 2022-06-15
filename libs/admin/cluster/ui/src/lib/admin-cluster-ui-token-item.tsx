import { Alert, Box, Button, Flex } from '@chakra-ui/react'
import { ClusterToken } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminClusterUiToken } from './admin-cluster-ui-token'

export function AdminClusterUiTokenItem({
  existing,
  selectToken,
  token,
}: {
  existing?: boolean
  selectToken: (token: ClusterToken) => void
  token: ClusterToken
}) {
  return (
    <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <AdminClusterUiToken token={token} />
      <Flex justifyContent="center" alignItems="center" pt={8}>
        {existing ? (
          <Alert status={'warning'}>This token is already added!</Alert>
        ) : (
          <Button onClick={() => selectToken(token)}>Select Token</Button>
        )}
      </Flex>
    </Box>
  )
}
