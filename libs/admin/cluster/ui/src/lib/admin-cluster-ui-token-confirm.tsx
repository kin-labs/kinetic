import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Stack } from '@chakra-ui/react'
import { ClusterToken } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminClusterUiToken } from './admin-cluster-ui-token'

export function AdminClusterUiTokenConfirm({
  clear,
  confirmToken,
  token,
}: {
  clear: () => void
  confirmToken: (token: ClusterToken) => void
  token: ClusterToken
}) {
  return (
    <Stack spacing={4}>
      <Button onClick={clear}>
        <ArrowBackIcon />
        Return to Results
      </Button>

      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <AdminClusterUiToken token={token} />
        <Stack direction="row" justifyContent="center" alignItems="center" pt={8} spacing={2}>
          <Button onClick={() => confirmToken(token)}>Confirm adding Token</Button>
        </Stack>
      </Box>
    </Stack>
  )
}
