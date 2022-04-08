import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminUserUiForm } from '@mogami/admin/user/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { UserUpdateInput, useUserQuery, useUpdateUserMutation } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminUserFeatureDetail() {
  const toast = useToast()
  const { userId } = useParams<{ userId: string }>()
  const [{ data, fetching }] = useUserQuery({ variables: { userId } })
  const [_, updateUserMutation] = useUpdateUserMutation()

  const onSubmit = async (input: UserUpdateInput) => {
    const res = await updateUserMutation({ userId, input })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'User updated' })
    }
    return res?.data?.updated
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {data?.item?.name}
        </Box>
      </Box>

      <Box>{fetching ? <AdminUiLoader /> : <AdminUserUiForm user={data?.item} onSubmit={onSubmit} />}</Box>
    </Stack>
  )
}
