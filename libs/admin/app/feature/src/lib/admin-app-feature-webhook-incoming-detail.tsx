import { Box, Flex, Stack } from '@chakra-ui/react'
import { AdminAppUiWebhookIncomingDetail } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppWebhookIncomingQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureWebhookIncomingDetail() {
  const { appId, appWebhookIncomingId } = useParams<{ appId: string; appWebhookIncomingId: string }>()
  const [{ data, fetching }] = useAppWebhookIncomingQuery({ variables: { appId, appWebhookIncomingId } })

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            WebhookIncoming {data?.item?.id}
          </Box>
        </Flex>
      </Box>
      {data?.item && <AdminAppUiWebhookIncomingDetail appId={appId} webhook={data?.item} />}
    </Stack>
  )
}
