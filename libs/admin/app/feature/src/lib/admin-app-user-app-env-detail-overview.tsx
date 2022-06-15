import { Stack } from '@chakra-ui/react'
import { useUserAppEnv } from '@kin-kinetic/admin/app/data-access'
import { AdminClusterUiMints } from '@kin-kinetic/admin/cluster/ui'
import { Mint } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailOverview() {
  const { appEnv } = useUserAppEnv()
  const mints = appEnv?.mints?.map((mint) => mint.mint as Mint)
  return (
    <AdminAppUserAppEnvDetailLayout>
      <Stack direction="column" spacing={6}>
        {mints?.length && appEnv.cluster?.id && <AdminClusterUiMints mints={mints} clusterId={appEnv.cluster?.id} />}
      </Stack>
    </AdminAppUserAppEnvDetailLayout>
  )
}
