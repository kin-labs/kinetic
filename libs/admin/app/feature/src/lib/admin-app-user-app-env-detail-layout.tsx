import { Box, Flex, Stack } from '@chakra-ui/react'
import { useUserAppEnv } from '@kin-kinetic/admin/app/data-access'
import { AdminAppUiHeader } from '@kin-kinetic/admin/app/ui'
import { AdminClusterUiCluster } from '@kin-kinetic/admin/cluster/ui'
import { AdminUiTabs } from '@kin-kinetic/admin/ui/tabs'
import React, { PropsWithChildren } from 'react'

export function AdminAppUserAppEnvDetailLayout({ children }: PropsWithChildren<any>) {
  const { appEnv, tabs } = useUserAppEnv()
  return (
    <Stack direction="column" spacing={6}>
      {appEnv.app && <AdminAppUiHeader app={appEnv.app} />}
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box maxW="32rem" fontSize="xl" as="h4">
            Environment: {appEnv?.name}
          </Box>
          {appEnv?.cluster && <AdminClusterUiCluster cluster={appEnv?.cluster} />}
        </Flex>
      </Box>
      <AdminUiTabs tabs={tabs}>{children}</AdminUiTabs>
    </Stack>
  )
}
