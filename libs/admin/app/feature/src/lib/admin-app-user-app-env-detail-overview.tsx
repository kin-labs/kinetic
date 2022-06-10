import { Stack } from '@chakra-ui/react'
import { useUserAppEnv } from '@mogami/admin/app/data-access'
import { AdminClusterUiMints } from '@mogami/admin/cluster/ui'
import React from 'react'
import { AdminAppUserAppEnvDetailLayout } from './admin-app-user-app-env-detail-layout'

export function AdminAppUserAppEnvDetailOverview() {
  const { appEnv } = useUserAppEnv()
  return (
    <AdminAppUserAppEnvDetailLayout>
      <Stack spacing={6}>
        {appEnv.mints?.map(
          ({ mint }) =>
            appEnv.cluster?.id && mint && <AdminClusterUiMints mints={[mint]} clusterId={appEnv.cluster?.id} />,
        )}
      </Stack>
    </AdminAppUserAppEnvDetailLayout>
  )
}
