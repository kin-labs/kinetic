import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiForm, AdminAppUiHeader, AdminAppUiUserModal, AdminAppUiUsers } from '@kin-kinetic/admin/app/ui'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { AdminUiTabs } from '@kin-kinetic/admin/ui/tabs'
import {
  UserAppUpdateInput,
  UserAppUserAddInput,
  AppUserRole,
  UserAppUserUpdateRoleInput,
  useUserAppQuery,
  useUserAppUserAddMutation,
  useUserAppUserUpdateRoleMutation,
  useUserUpdateAppMutation,
} from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AdminAppUserEnvironmentsTab } from './admin-app-user-environments-tab'

export default function AdminAppUserFeatureDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, error, fetching }] = useUserAppQuery({ variables: { appId: appId! } })
  const [, updateAppMutation] = useUserUpdateAppMutation()
  const [, updateUserAddMutation] = useUserAppUserAddMutation()
  const [, updateRoleMutation] = useUserAppUserUpdateRoleMutation()

  const onSubmit = async (input: UserAppUpdateInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const res = await updateAppMutation({
      appId: appId!,
      input: {
        name: input.name,
      },
    })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'App updated' })
    }
    if (res?.error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = (res.error.graphQLErrors[0]?.extensions as any).response.message ?? [
        res.error?.message?.toString(),
      ]
      for (const error of errors) {
        toast({
          status: 'error',
          title: 'App update failed',
          description: error,
        })
      }
    }
    return res?.data?.updated
  }
  const role = data?.role || AppUserRole.Member
  const tabs = [{ path: `../environments`, label: 'Environments' }]
  if (role === AppUserRole.Owner) {
    tabs.push(
      ...[
        { path: `../users`, label: 'Users' },
        { path: `../settings`, label: 'Settings' },
      ],
    )
  }
  const addRole = async ({ role, userId }: UserAppUserAddInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateUserAddMutation({ appId: appId!, input: { role, userId } })
  }
  const updateRole = async ({ userId, role }: UserAppUserUpdateRoleInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateRoleMutation({ appId: appId!, input: { role, userId } })
  }

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  if (!data?.item || !appId) {
    return <AdminUiAlert status="warning" message="App not found :(" />
  }

  return (
    <Stack direction="column" spacing={6}>
      <AdminAppUiHeader app={data?.item} />
      <Routes>
        <Route index element={<Navigate to="environments" />} />
        <Route
          path="environments"
          element={
            <AdminUiTabs tabs={tabs}>
              <AdminAppUserEnvironmentsTab appId={appId} />
            </AdminUiTabs>
          }
        />
        <Route
          path="users"
          element={
            <AdminUiTabs tabs={tabs}>
              <Stack direction="column" spacing={6}>
                <Box w="full">
                  <AdminAppUiUsers updateRole={updateRole} users={data?.item?.users} />
                </Box>
                <Box>
                  <AdminAppUiUserModal addRole={addRole} />
                </Box>
              </Stack>
            </AdminUiTabs>
          }
        />
        <Route
          path="settings"
          element={
            <AdminUiTabs tabs={tabs}>
              <AdminAppUiForm app={data?.item} onSubmit={onSubmit} />
            </AdminUiTabs>
          }
        />
      </Routes>
    </Stack>
  )
}
