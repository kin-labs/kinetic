import { Box, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useUserAppEnvQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppUserFeatureEnvTransactionList() {
  const toast = useToast()
  const { appId, appEnvId } = useParams<{ appId: string; appEnvId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, error, fetching }] = useUserAppEnvQuery({ variables: { appId: appId!, appEnvId: appEnvId! } })

  if (fetching) {
    return <AdminUiLoader />
  }
  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box maxW="32rem">
            <Heading>Transactions</Heading>
          </Box>
        </Flex>
      </Box>
      {data?.item && (
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(data.item, null, 2)}
        </Box>
      )}
    </Stack>
  )
}
