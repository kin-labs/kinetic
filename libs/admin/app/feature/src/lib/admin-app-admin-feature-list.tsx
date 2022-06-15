import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiTable } from '@kin-kinetic/admin/app/ui'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useAdminDeleteAppMutation, useUserAppsQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppAdminFeatureList() {
  const toast = useToast()
  const [{ data, error, fetching }, refresh] = useUserAppsQuery()
  const [, deleteApp] = useAdminDeleteAppMutation()

  const handleDelete = async (appId: string) => {
    if (!window.confirm(`Are you sure?`)) return
    const res = await deleteApp({ appId })
    if (res.data?.deleted) {
      toast({
        title: 'App deleted',
        description: `App name: ${res.data.deleted.name} (${res.data.deleted.index})`,
      })
    }
    await refresh()
  }

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
      {data?.items?.length ? (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <AdminAppUiTable apps={data?.items} deleteApp={handleDelete} />
        </Box>
      ) : (
        <AdminUiAlert status="warning" message={'No apps found'} />
      )}
    </Stack>
  )
}
