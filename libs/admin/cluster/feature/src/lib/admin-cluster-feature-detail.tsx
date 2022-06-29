import { Box, Flex, Image, Stack } from '@chakra-ui/react'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { AdminUiTabs } from '@kin-kinetic/admin/ui/tabs'
import { useAdminClusterQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AdminClusterFeatureMintsTab } from './admin-cluster-feature-mints-tab'
import { AdminClusterFeatureSettingsTab } from './admin-cluster-feature-settings-tab'
import { AdminClusterFeatureStatsTab } from './admin-cluster-feature-stats-tab'

export default function AdminClusterFeatureDetail() {
  const { clusterId } = useParams<{ clusterId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, fetching }] = useAdminClusterQuery({ variables: { clusterId: clusterId! } })

  if (!data || fetching) {
    return <AdminUiLoader />
  }
  const tabs = [
    { path: `../mints`, label: 'Mints' },
    { path: `../stats`, label: 'Stats' },
    { path: `../settings`, label: 'Settings' },
  ]
  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
            Cluster: {data?.item?.name}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
            <Image src={'/assets/solana-logo.svg'} h={8} />
          </Box>
        </Flex>
      </Box>
      <Routes>
        <Route index element={<Navigate to="mints" />} />
        <Route
          path="mints"
          element={
            <AdminUiTabs tabs={tabs}>{clusterId && <AdminClusterFeatureMintsTab clusterId={clusterId} />}</AdminUiTabs>
          }
        />
        <Route
          path="stats"
          element={
            <AdminUiTabs tabs={tabs}>{clusterId && <AdminClusterFeatureStatsTab clusterId={clusterId} />}</AdminUiTabs>
          }
        />
        <Route
          path="settings"
          element={
            <AdminUiTabs tabs={tabs}>
              {clusterId && <AdminClusterFeatureSettingsTab clusterId={clusterId} />}
            </AdminUiTabs>
          }
        />
      </Routes>
    </Stack>
  )
}
