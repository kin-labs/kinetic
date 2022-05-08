import { Box } from '@chakra-ui/react'
import { AppWebhookIncoming } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export interface AdminAppUiWebhookIncomingDetailProps {
  appId: string
  webhook: AppWebhookIncoming | null | undefined
}

export function AdminAppUiWebhookIncomingDetail({ appId, webhook }: AdminAppUiWebhookIncomingDetailProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto" as="pre" marginY={10}>
      {JSON.stringify(webhook, null, 2)}
    </Box>
  )
}
