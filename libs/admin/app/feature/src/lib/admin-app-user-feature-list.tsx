import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiGrid } from '@kin-kinetic/admin/app/ui'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useUserAppsQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export default function AdminAppUserFeatureList() {
  const toast = useToast()
  const [{ data, error, fetching }] = useUserAppsQuery()

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }
  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          Apps
        </Box>
      </Box>
      <Box>
        {data?.items?.length ? (
          <AdminAppUiGrid apps={data?.items} />
        ) : (
          <AdminUiAlert status="warning" message={'No apps found'} />
        )}
      </Box>
    </Stack>
  )
}
