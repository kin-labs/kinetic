import { Box, Flex, Image, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useClusterQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ClusterMintsTab } from './cluster-mints-tab'
import { ClusterSettingsTab } from './cluster-settings-tab'

export default function AdminClusterFeatureDetail() {
  const { clusterId } = useParams<{ clusterId: string }>()
  const [{ data, fetching }] = useClusterQuery({ variables: { clusterId } })

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
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ClusterMintsTab clusterId={clusterId} />
          </TabPanel>
          <TabPanel>
            <ClusterSettingsTab clusterId={clusterId}></ClusterSettingsTab>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
