import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import {
  AdminAppUiEnvironments,
  AdminAppUiForm,
  AdminAppUiTransactions,
  AdminAppUiUserModal,
  AdminAppUiUsers,
  AdminAppUiWallet,
  AdminAppUiWalletBalances,
  AdminAppUiWebhooks,
} from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import {
  AppUpdateInput,
  AppUserAddInput,
  AppUserUpdateRoleInput,
  useAppQuery,
  useAppTransactionsQuery,
  useAppUserAddMutation,
  useAppUserUpdateRoleMutation,
  useAppWebhooksQuery,
  useUpdateAppMutation,
  Wallet,
} from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'
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
    const res = await updateAppMutation({ appId: appId!, input })
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
          <Tab>Wallet</Tab>
          <Tab>Transactions</Tab>
          <Tab>Webhooks </Tab>
          <Tab>Users</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{appId && <AppEnvironmentsTab appId={appId} />}</TabPanel>
          <TabPanel>
            {data?.item?.wallets &&
              data?.item?.wallets.map((wallet: Wallet) => (
                <Box key={wallet.id}>
                  <AdminAppUiWallet wallet={wallet} />
                  <AdminAppUiWalletBalances wallet={wallet} />
                </Box>
              ))}
          </TabPanel>
          <TabPanel>{appId && <AppTransactionsTab appId={appId} />}</TabPanel>
          <TabPanel>{appId && <AppWebhooksTab appId={appId} />}</TabPanel>
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

function AppEnvironmentsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiEnvironments appId={appId} environments={data?.item?.envs} />
}

function AppTransactionsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppTransactionsQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiTransactions appId={appId} transactions={data?.items} />
}

function AppWebhooksTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppWebhooksQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiWebhooks appId={appId} webhooks={data?.items} />
}
