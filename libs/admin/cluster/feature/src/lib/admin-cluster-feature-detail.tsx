import { Box, Flex, Image, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useClusterQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AdminClusterFeatureMintsTab } from './admin-cluster-feature-mints-tab'
import { AdminClusterFeatureSettingsTab } from './admin-cluster-feature-settings-tab'
import { AdminClusterFeatureStatsTab } from './admin-cluster-feature-stats-tab'

export default function AdminClusterFeatureDetail() {
  const { clusterId } = useParams<{ clusterId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, fetching }] = useClusterQuery({ variables: { clusterId: clusterId! } })

  if (!data || fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            Cluster: {data?.item?.name}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            <Image src={'/assets/solana-logo.svg'} h={8} />
          </Box>
        </Flex>
      </Box>

      <Tabs isLazy colorScheme="teal">
        <TabList>
          <Tab>Mints</Tab>
          <Tab>Stats</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{clusterId && <AdminClusterFeatureMintsTab clusterId={clusterId} />}</TabPanel>
          <TabPanel>{clusterId && <AdminClusterFeatureStatsTab clusterId={clusterId} />}</TabPanel>
          <TabPanel>{clusterId && <AdminClusterFeatureSettingsTab clusterId={clusterId} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
