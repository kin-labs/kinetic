import { Stack } from '@chakra-ui/react'
import { AdminClusterUiMints } from '@mogami/admin/cluster/ui'
import React from 'react'
import { useAppEnv } from './app-env-provider'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailOverview() {
  const { appEnv } = useAppEnv()
  return (
    <EnvDetailLayout>
      <Stack spacing={6}>
        {appEnv.mints?.map(
          ({ mint }) =>
            appEnv.cluster?.id && mint && <AdminClusterUiMints mints={[mint]} clusterId={appEnv.cluster?.id} />,
        )}
      </Stack>
    </EnvDetailLayout>
  )
}
