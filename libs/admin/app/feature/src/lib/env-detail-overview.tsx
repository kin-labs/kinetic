import { Stack } from '@chakra-ui/react'
import { AdminClusterUiMints } from '@mogami/admin/cluster/ui'
import React from 'react'
import { useAppEnv } from './app-env-provider'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailOverview() {
  const { env } = useAppEnv()
  return (
    <EnvDetailLayout>
      <Stack spacing={6}>
        {env.mints?.map(
          ({ mint }) => env.cluster?.id && mint && <AdminClusterUiMints mints={[mint]} clusterId={env.cluster?.id} />,
        )}
      </Stack>
    </EnvDetailLayout>
  )
}
