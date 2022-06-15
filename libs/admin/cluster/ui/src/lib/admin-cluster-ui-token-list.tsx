import { Stack } from '@chakra-ui/react'
import { ClusterToken } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminClusterUiTokenItem } from './admin-cluster-ui-token-item'

export function AdminClusterUiTokenList({
  existing,
  selectToken,
  tokens,
}: {
  existing: string[]
  selectToken: (token: ClusterToken) => void
  tokens: ClusterToken[]
}) {
  return (
    <Stack spacing={4}>
      {tokens?.map(
        (item) =>
          item.address && (
            <AdminClusterUiTokenItem
              key={item.address}
              existing={existing.includes(item.address)}
              token={item}
              selectToken={selectToken}
            />
          ),
      )}
    </Stack>
  )
}
