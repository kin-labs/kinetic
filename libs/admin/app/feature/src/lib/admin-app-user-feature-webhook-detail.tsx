import { Box, Flex, Stack } from '@chakra-ui/react'
import { AdminAppUiWebhookDetail } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useUserAppWebhookQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export default function AdminAppUserFeatureWebhookDetail({
  appId,
  appWebhookId,
}: {
  appId: string
  appWebhookId: string
}) {
  const [{ data, fetching }] = useUserAppWebhookQuery({ variables: { appId: appId!, appWebhookId: appWebhookId! } })

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
            Webhook {data?.item?.id}
          </Box>
        </Flex>
      </Box>
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        data?.item && <AdminAppUiWebhookDetail appId={appId!} webhook={data?.item} />
      }
    </Stack>
  )
}