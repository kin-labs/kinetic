import { Box, Stack } from '@chakra-ui/react'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useClusterStatsQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterFeatureStatsTab({ clusterId }: { clusterId: string }) {
  const [{ data, fetching }] = useClusterStatsQuery({ variables: { clusterId } })
  if (!data || fetching) {
    return <AdminUiLoader />
  }
  return (
    <Stack spacing={6}>
      <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
        {JSON.stringify(data, null, 2)}
      </Box>
    </Stack>
  )
}
