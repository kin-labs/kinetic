import { Flex, Stack } from '@chakra-ui/react'
import { Mint } from '@kin-kinetic/web/util/sdk'
import { Button } from '@saas-ui/react'
import { WebClusterUiMintDetails } from './web-cluster-ui-mint-details'

export function WebAppUiMintDisabledPanel({
  enableMint,
  mint,
}: {
  enableMint: (mintId: string) => void
  mint?: Mint | null
}) {
  return mint && mint?.id ? (
    <Stack direction="column" spacing={6} p={6} borderWidth="1px" borderRadius="lg" key={mint?.id}>
      {mint && <WebClusterUiMintDetails mint={mint} />}
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="lg" onClick={() => enableMint(mint!.id!)}>
          Enable {mint?.symbol}
        </Button>
      </Flex>
    </Stack>
  ) : null
}
