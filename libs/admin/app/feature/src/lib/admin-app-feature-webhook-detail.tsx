import { Box, Flex, Stack } from '@chakra-ui/react'
import { AdminAppUiWebhookDetail } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppWebhookQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureWebhookDetail() {
  const { appId, appWebhookId } = useParams<{ appId: string; appWebhookId: string }>()
  const [{ data, fetching }] = useAppWebhookQuery({ variables: { appId, appWebhookId } })

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            Webhook {data?.item?.id}
          </Box>
        </Flex>
      </Box>
      {data?.item && <AdminAppUiWebhookDetail appId={appId} webhook={data?.item} />}
    </Stack>
  )
}
