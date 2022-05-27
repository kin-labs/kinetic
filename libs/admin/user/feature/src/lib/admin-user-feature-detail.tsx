import { Box, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import { AdminUserUiApps, AdminUserUiEmails, AdminUserUiForm } from '@mogami/admin/user/ui'
import { UserUpdateInput, useUpdateUserMutation, useUserQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminUserFeatureDetail() {
  const toast = useToast()
  const { userId } = useParams<{ userId: string }>()
  const [{ data }] = useUserQuery({ variables: { userId: userId! } })
  const [_, updateUserMutation] = useUpdateUserMutation()

  const onSubmit = async (input: UserUpdateInput) => {
    const res = await updateUserMutation({ userId: userId!, input })
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

      <Tabs isLazy colorScheme="teal">
        <TabList>
          <Tab>Apps</Tab>
          <Tab>Emails</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminUserUiApps apps={data?.item?.apps} />
          </TabPanel>
          <TabPanel>
            <AdminUserUiEmails emails={data?.item?.emails} />
          </TabPanel>
          <TabPanel>
            <AdminUserUiForm user={data?.item} onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
