import { Avatar, Box, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import { AdminUiTabs } from '@kin-kinetic/admin/ui/tabs'
import { AdminUserUiApps, AdminUserUiEmails, AdminUserUiForm } from '@kin-kinetic/admin/user/ui'
import { UserUpdateInput, useAdminUpdateUserMutation, useAdminUserQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'

export default function AdminUserFeatureDetail() {
  const toast = useToast()
  const { path, url } = useRouteMatch()
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
    { path: `${url}/apps`, label: 'Apps' },
    { path: `${url}/emails`, label: 'Emails' },
    { path: `${url}/settings`, label: 'Settings' },
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
      <Switch>
        <Route path={path} exact render={() => <Redirect to={`${url}/apps`} />} />
        <Route
          path={`${path}/apps`}
          render={() => (
            <AdminUiTabs tabs={tabs}>
              <AdminUserUiApps apps={data?.item?.apps} />
            </AdminUiTabs>
          )}
        />
        <Route
          path={`${path}/emails`}
          render={() => (
            <AdminUiTabs tabs={tabs}>
              <AdminUserUiEmails emails={data?.item?.emails} />
            </AdminUiTabs>
          )}
        />
        <Route
          path={`${path}/settings`}
          render={() => (
            <AdminUiTabs tabs={tabs}>
              <AdminUserUiForm user={data?.item} onSubmit={onSubmit} />
            </AdminUiTabs>
          )}
        />
      </Switch>
    </Stack>
  )
}
