import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { AdminUserUiTable } from '@mogami/admin/user/ui'
import { useDeleteUserMutation, useUsersQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export default function AdminUserFeatureList() {
  const toast = useToast()
  const [{ data, fetching }, refresh] = useUsersQuery()
  const [, deleteUser] = useDeleteUserMutation()

  const handleDelete = async (userId: string) => {
    if (!window.confirm(`Are you sure?`)) return
    const res = await deleteUser({ userId })
    if (res.data?.deleted) {
      toast({
        title: 'User deleted',
        description: `User name: ${res.data.deleted.name}`,
      })
    }
    await refresh()
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          Users
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
        {fetching && !data?.items?.length ? (
          <AdminUiLoader />
        ) : (
          <div>
            <AdminUserUiTable users={data?.items} deleteUser={handleDelete} />
          </div>
        )}
      </Box>
    </Stack>
  )
}
