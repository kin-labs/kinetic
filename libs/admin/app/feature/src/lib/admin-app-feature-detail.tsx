import { Box, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import { AdminAppUiForm, AdminAppUiUserModal, AdminAppUiUsers } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import {
  AppUpdateInput,
  AppUserAddInput,
  AppUserUpdateRoleInput,
  useAppQuery,
  useAppUserAddMutation,
  useAppUserUpdateRoleMutation,
  useUpdateAppMutation,
} from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AppEnvironmentsTab } from './app-environments-tab'
import { AppHeader } from './app-header'

export default function AdminAppFeatureDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, fetching }] = useAppQuery({ variables: { appId: appId! } })
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

  const addRole = async ({ role, userId }: AppUserAddInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateUserAddMutation({ appId: appId!, input: { role, userId } })
  }
  const updateRole = async ({ userId, role }: AppUserUpdateRoleInput) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateRoleMutation({ appId: appId!, input: { role, userId } })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  if (!data?.item) {
    return <div>App not found :(</div>
  }

  return (
    <Stack direction="column" spacing={6}>
      <AppHeader app={data?.item} />
      <Tabs isLazy colorScheme="teal">
        <TabList>
          <Tab>Environments</Tab>
          <Tab>Users</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{appId && <AppEnvironmentsTab appId={appId} />}</TabPanel>
          <TabPanel>
            <Stack direction="column" spacing={6}>
              <Box w="full">
                <AdminAppUiUsers updateRole={updateRole} users={data?.item?.users} />
              </Box>
              <Box>
                <AdminAppUiUserModal addRole={addRole} />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <AdminAppUiForm app={data?.item} onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
