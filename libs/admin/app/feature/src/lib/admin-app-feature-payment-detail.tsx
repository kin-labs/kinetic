import { Box, Flex, Stack } from '@chakra-ui/react'
import { AdminAppUiPaymentDetail, AdminAppUiPaymentTimeline } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppPaymentQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeaturePaymentDetail() {
  const { appId, appPaymentId } = useParams<{ appId: string; appPaymentId: string }>()
  const [{ data, fetching }] = useAppPaymentQuery({ variables: { appId, appPaymentId } })

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            Payment {data?.item?.id}
          </Box>
        </Flex>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiPaymentDetail item={data?.item} />}
      </Box>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiPaymentTimeline item={data?.item} />}
      </Box>
    </Stack>
  )
}
