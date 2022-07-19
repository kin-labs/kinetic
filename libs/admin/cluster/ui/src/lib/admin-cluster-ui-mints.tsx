import { Alert, Box, SimpleGrid } from '@chakra-ui/react'
import { Mint } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminClusterUiMintDetails } from './admin-cluster-ui-mint-details'

export interface AdminClusterUiMintsProps {
  clusterId: string
  mints: Mint[] | null | undefined
}

export function AdminClusterUiMints({ mints }: AdminClusterUiMintsProps) {
  if (!mints?.length) {
    return <Alert>No mints found.</Alert>
  }
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
      {mints?.map((mint) => (
        <Box p={6} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <AdminClusterUiMintDetails key={mint?.id} mint={mint} />
        </Box>
      ))}
    </SimpleGrid>
  )
}
