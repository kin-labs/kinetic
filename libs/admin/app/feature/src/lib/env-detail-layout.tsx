import { Box, Flex, Stack } from '@chakra-ui/react'
import { AdminClusterUiCluster } from '@mogami/admin/cluster/ui'
import { AdminUiTabs } from '@mogami/admin/ui/tabs'
import React, { PropsWithChildren } from 'react'
import { useAppEnv } from './app-env-provider'
import { AppHeader } from './app-header'

export function EnvDetailLayout({ children }: PropsWithChildren<any>) {
  const { appEnv, tabs } = useAppEnv()
  return (
    <Stack direction="column" spacing={6}>
      {appEnv.app && <AppHeader app={appEnv.app} />}
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
