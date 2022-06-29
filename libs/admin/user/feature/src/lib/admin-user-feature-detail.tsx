import { Avatar, Box, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import { AdminUiTabs } from '@kin-kinetic/admin/ui/tabs'
import { AdminUserUiApps, AdminUserUiEmails, AdminUserUiForm } from '@kin-kinetic/admin/user/ui'
import { useAdminUpdateUserMutation, useAdminUserQuery, UserUpdateInput } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

export default function AdminUserFeatureDetail() {
  const toast = useToast()
  const { userId } = useParams<{ userId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data }] = useAdminUserQuery({ variables: { userId: userId! } })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateUserMutation] = useAdminUpdateUserMutation()

  const onSubmit = async (input: UserUpdateInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const res = await updateUserMutation({ userId: userId!, input })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'User updated' })
    }
    return res?.data?.updated
  }
  const tabs = [
    { path: `../apps`, label: 'Apps' },
    { path: `../emails`, label: 'Emails' },
    { path: `../settings`, label: 'Settings' },
  ]
  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          <Flex alignItems="center">
            {data?.item?.avatarUrl ? <Avatar mr={4} size="lg" src={data?.item?.avatarUrl} /> : null}
            <Flex direction="column">
              <Text fontSize="2xl">{data?.item?.name}</Text>
              <Text color="gray.500">{data?.item?.role}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Routes>
        <Route index element={<Navigate to="apps" />} />
        <Route
          path="apps"
          element={
            <AdminUiTabs tabs={tabs}>
              <AdminUserUiApps apps={data?.item?.apps} />
            </AdminUiTabs>
          }
        />
        <Route
          path="emails"
          element={
            <AdminUiTabs tabs={tabs}>
              <AdminUserUiEmails emails={data?.item?.emails} />
            </AdminUiTabs>
          }
        />
        <Route
          path="settings"
          element={
            <AdminUiTabs tabs={tabs}>
              <AdminUserUiForm user={data?.item} onSubmit={onSubmit} />
            </AdminUiTabs>
          }
        />
      </Routes>
    </Stack>
  )
}
