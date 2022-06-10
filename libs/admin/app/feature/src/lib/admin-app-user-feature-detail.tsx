import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiForm, AdminAppUiHeader, AdminAppUiUserModal, AdminAppUiUsers } from '@mogami/admin/app/ui'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { AdminUiTabs } from '@mogami/admin/ui/tabs'
import {
  AppUpdateInput,
  AppUserAddInput,
  AppUserUpdateRoleInput,
  useAppUserAddMutation,
  useAppUserUpdateRoleMutation,
  useUpdateAppMutation,
  useUserAppQuery,
} from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { AdminAppUserEnvironmentsTab } from './admin-app-user-environments-tab'

export default function AdminAppUserFeatureDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, error, fetching }] = useUserAppQuery({ variables: { appId: appId! } })
  const [, updateAppMutation] = useUpdateAppMutation()
  const [, updateUserAddMutation] = useAppUserAddMutation()
  const [, updateRoleMutation] = useAppUserUpdateRoleMutation()

  const onSubmit = async (input: AppUpdateInput) => {
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
  const { path, url } = useRouteMatch()
  const tabs = [
    { path: `${url}/environments`, label: 'Environments' },
    { path: `${url}/users`, label: 'Users' },
    { path: `${url}/settings`, label: 'Settings' },
  ]

  const addRole = async ({ role, userId }: AppUserAddInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateUserAddMutation({ appId: appId!, input: { role, userId } })
  }
  const updateRole = async ({ userId, role }: AppUserUpdateRoleInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateRoleMutation({ appId: appId!, input: { role, userId } })
  }

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  if (!data?.item) {
    return <AdminUiAlert status="warning" message="App not found :(" />
  }

  return (
    <Stack direction="column" spacing={6}>
      <AdminAppUiHeader app={data?.item} />
      <Switch>
        <Route path={path} exact render={() => <Redirect to={`${url}/environments`} />} />
        <Route
          path={`${path}/environments`}
          render={() => (
            <AdminUiTabs tabs={tabs}>
              <AdminAppUserEnvironmentsTab appId={appId} />
            </AdminUiTabs>
          )}
        />
        <Route
          path={`${path}/users`}
          render={() => (
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
          )}
        />
        <Route
          path={`${path}/settings`}
          render={() => (
            <AdminUiTabs tabs={tabs}>
              <AdminAppUiForm app={data?.item} onSubmit={onSubmit} />
            </AdminUiTabs>
          )}
        />
      </Switch>
    </Stack>
  )
}
