import { Alert, Box, SimpleGrid } from '@chakra-ui/react'
import { Mint } from '@kin-kinetic/web/util/sdk'
import { WebAdminUiMintDetails } from './web-admin-ui-mint-details'

export interface WebAdminUiMintsProps {
  clusterId: string
  mints: Mint[] | null | undefined
}

export function WebAdminUiMints({ mints }: WebAdminUiMintsProps) {
  if (!mints?.length) {
    return <Alert>No mints found.</Alert>
  }
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 2, md: 6 }}>
      {mints?.map((mint) => (
        <Box key={mint.id} p={6} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <WebAdminUiMintDetails key={mint?.id} mint={mint} />
        </Box>
      ))}
    </SimpleGrid>
  )
}
