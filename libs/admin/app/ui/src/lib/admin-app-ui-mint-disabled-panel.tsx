import { Button, Flex, Stack } from '@chakra-ui/react'
import { AdminClusterUiMintDetails } from '@kin-kinetic/admin/cluster/ui'
import { Mint } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiMintDisabledPanel({
  enableMint,
  mint,
}: {
  enableMint: (mintId: string) => void
  mint?: Mint | null
}) {
  return mint && mint?.id ? (
    <Stack direction="column" spacing={6} p={6} borderWidth="1px" borderRadius="lg" key={mint?.id}>
      {mint && <AdminClusterUiMintDetails mint={mint} />}
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="lg" onClick={() => enableMint(mint!.id!)}>
          Enable {mint?.symbol}
        </Button>
      </Flex>
    </Stack>
  ) : null
}
