import { Flex, Stack } from '@chakra-ui/react'
import { Mint } from '@kin-kinetic/web/util/sdk'
import { Button } from '@saas-ui/react'
import { WebClusterUiMintDetails } from './web-cluster-ui-mint-details'

export function WebAppUiMintDisabledPanel({ enableMint, mint }: { mint: Mint; enableMint: (mintId: string) => void }) {
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebClusterUiMintDetails mint={mint} />
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="xs" onClick={() => enableMint(`${mint.id}`)} variant="outline">
          Enable mint
        </Button>
      </Flex>
    </Stack>
  )
}
