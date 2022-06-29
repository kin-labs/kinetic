import { Box, Stack } from '@chakra-ui/react'
import { AdminUiTabs } from '@kin-kinetic/admin/ui/tabs'
import { useAdminWalletQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

export default function AdminWalletFeatureDetail() {
  const { walletId } = useParams<{ walletId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data }] = useAdminWalletQuery({ variables: { walletId: walletId! } })

  const tabs = [{ path: `../overview`, label: 'Overview' }]
  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {data?.item?.publicKey}
        </Box>
      </Box>
      <Routes>
        <Route index element={<Navigate to="overview" />} />
        <Route
          path="overview"
          element={
            <AdminUiTabs tabs={tabs}>
              <Box as="pre" fontSize="xs" color="gray.500">
                {JSON.stringify(data, null, 2)}
              </Box>
            </AdminUiTabs>
          }
        />
      </Routes>
    </Stack>
  )
}
