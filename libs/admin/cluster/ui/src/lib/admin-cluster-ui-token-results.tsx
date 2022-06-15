import { ArrowBackIcon } from '@chakra-ui/icons'
import { Alert, Box, Button, Stack } from '@chakra-ui/react'
import { ClusterToken, ClusterTokenInput, useAdminClusterTokensQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminClusterUiTokenList } from './admin-cluster-ui-token-list'

export function AdminClusterUiTokenResults({
  clear,
  existing,
  input,
  selectToken,
}: {
  clear: () => void
  existing: string[]
  input: ClusterTokenInput
  selectToken: (token: ClusterToken) => void
}) {
  const [{ data, fetching }] = useAdminClusterTokensQuery({ variables: { input } })
  if (fetching) {
    return <Alert>Loading.</Alert>
  }

  return (
    <Box>
      {data?.items && (
        <Stack spacing={4}>
          <Button onClick={clear}>
            <ArrowBackIcon />
            Return to Search
          </Button>
          <Box>
            {!data?.items?.length ? (
              <Alert>No tokens found.</Alert>
            ) : (
              <Alert>Tokens found: {data?.items?.length}</Alert>
            )}
          </Box>
          <AdminClusterUiTokenList existing={existing} selectToken={selectToken} tokens={data?.items} />
        </Stack>
      )}
    </Box>
  )
}
