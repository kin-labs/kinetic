import { Box } from '@chakra-ui/react'
import { AppWebhook } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export interface AdminAppUiWebhookDetailProps {
  appId: string
  webhook: AppWebhook | null | undefined
}

export function AdminAppUiWebhookDetail({ appId, webhook }: AdminAppUiWebhookDetailProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto" as="pre" marginY={10}>
      {JSON.stringify(webhook, null, 2)}
    </Box>
  )
}
