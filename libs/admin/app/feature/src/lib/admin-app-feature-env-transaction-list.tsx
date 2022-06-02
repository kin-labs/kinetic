import { Box, Flex, Heading, Text, Stack } from '@chakra-ui/react'
import { AdminClusterUiCluster } from '@mogami/admin/cluster/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppEnvQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureEnvTransactionList() {
  const { appId, appEnvId } = useParams<{ appId: string; appEnvId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data, error, fetching }] = useAppEnvQuery({ variables: { appId: appId!, appEnvId: appEnvId! } })

  console.log({ data, error, fetching })
  if (fetching) {
    return <AdminUiLoader />
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
