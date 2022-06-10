import { Box, Flex, Stack } from '@chakra-ui/react'
import {
  AdminAppUiTransactionDetail,
  AdminAppUiTransactionErrors,
  AdminAppUiTransactionStatus,
  AdminAppUiTransactionTimeline,
} from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { AppTransactionStatus, useAppTransactionQuery } from '@mogami/shared/util/admin-sdk'
import React, { useEffect } from 'react'

export default function AdminAppUserFeatureTransactionDetail({
  appId,
  appEnvId,
  appTransactionId,
}: {
  appId: string
  appEnvId: string
  appTransactionId: string
}) {
  const [{ data, fetching }, refresh] = useAppTransactionQuery({
    variables: { appId: appId, appEnvId, appTransactionId: appTransactionId },
  })

  useEffect(() => {
    if (!fetching && data?.item?.status !== AppTransactionStatus.Finalized) {
      const id = setTimeout(() => refresh(), 5000)
      return () => clearTimeout(id)
    }
    return
  }, [data?.item, fetching, refresh])

  if (fetching && !data?.item) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
            Transaction {data?.item?.id}
          </Box>
          <Box justifyContent={'end'} mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            <AdminAppUiTransactionStatus status={data?.item?.status} />
          </Box>
        </Flex>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiTransactionDetail item={data?.item} />}
      </Box>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiTransactionErrors item={data?.item} />}
      </Box>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiTransactionTimeline item={data?.item} />}
      </Box>
      {/*<Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">*/}
      {/*  {JSON.stringify(data?.item, null, 2)}*/}
      {/*</Box>*/}
    </Stack>
  )
}
