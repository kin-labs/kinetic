import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import {
  AdminAppUiCreations,
  AdminAppUiForm,
  AdminAppUiPayments,
  AdminAppUiUserModal,
  AdminAppUiUsers,
  AdminAppUiWallet,
  AdminAppUiWalletBalances,
  AdminAppUiWebhooksIncoming,
} from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import {
  AppUpdateInput,
  AppUserAddInput,
  AppUserUpdateRoleInput,
  useAppCreationsQuery,
  useAppPaymentsQuery,
  useAppQuery,
  useAppUserAddMutation,
  useAppUserUpdateRoleMutation,
  useAppWebhooksIncomingQuery,
  useUpdateAppMutation,
} from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  const [{ data, fetching }] = useAppQuery({ variables: { appId } })
  const [, updateAppMutation] = useUpdateAppMutation()
  const [, updateUserAddMutation] = useAppUserAddMutation()
  const [, updateRoleMutation] = useAppUserUpdateRoleMutation()

  const onSubmit = async (input: AppUpdateInput) => {
    const res = await updateAppMutation({ appId, input })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'App updated' })
    }
    if (res?.error) {
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
    await updateUserAddMutation({ appId, input: { role, userId } })
  }
  const updateRole = async ({ userId, role }: AppUserUpdateRoleInput) => {
    await updateRoleMutation({ appId, input: { role, userId } })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            {data?.item?.name}
          </Box>
          <code>App Index: {data?.item?.index}</code>
        </Flex>
      </Box>

      <Tabs isLazy colorScheme="teal">
        <TabList>
          <Tab>Wallet</Tab>
          <Tab>Creations</Tab>
          <Tab>Payments</Tab>
          <Tab>Webhooks Incoming</Tab>
          <Tab>Users</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {data?.item?.wallet && (
              <Box>
                <AdminAppUiWallet wallet={data?.item?.wallet} />
                <AdminAppUiWalletBalances wallet={data?.item?.wallet} />
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <AppCreationsTab appId={appId} />
          </TabPanel>
          <TabPanel>
            <AppPaymentsTab appId={appId} />
          </TabPanel>
          <TabPanel>
            <AppWebhooksIncomingTab appId={appId} />
          </TabPanel>
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

function AppCreationsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppCreationsQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiCreations appId={appId} creations={data?.items} />
}

function AppPaymentsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppPaymentsQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiPayments appId={appId} payments={data?.items} />
}

function AppWebhooksIncomingTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppWebhooksIncomingQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiWebhooksIncoming appId={appId} webhooks={data?.items} />
}
