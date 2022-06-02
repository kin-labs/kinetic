import { Box, Image, Stack } from '@chakra-ui/react'
import { Cluster } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterUiCluster({ cluster }: { cluster: Cluster }) {
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center">
      <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
        {cluster?.name}
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        <Image src={'/assets/solana-logo.svg'} h={8} />
      </Box>
    </Stack>
  )
}
