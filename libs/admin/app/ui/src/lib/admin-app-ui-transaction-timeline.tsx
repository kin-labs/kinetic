import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Button, List, ListIcon, ListItem, Stack } from '@chakra-ui/react'
import { AppTransaction, AppWebhook, Maybe } from '@kin-kinetic/shared/util/admin-sdk'
import React, { useState } from 'react'

export function AdminAppUiTransactionTimeline({ item }: { item: AppTransaction }) {
  return (
    <List spacing={3}>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Created 0ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Processing: {item?.processingDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color={item?.webhookVerifyDuration ? 'green.500' : 'gray.500'} />
        Verify Webhook: {item?.webhookVerifyDuration ? `${item?.webhookVerifyDuration}ms` : 'disabled'}
        <Stack px={6} mt={2}>
          <TransactionWebhook webhook={item?.webhookVerifyOutgoing} />
          <TransactionWebhook webhook={item?.webhookVerifyIncoming} />
        </Stack>
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Solana Committed {item?.solanaCommittedDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color={item?.webhookEventDuration ? 'green.500' : 'gray.500'} />
        Event Webhook: {item?.webhookEventDuration ? `${item?.webhookEventDuration}ms` : 'disabled'}
        <Stack px={6} mt={2}>
          <TransactionWebhook webhook={item?.webhookEventOutgoing} />
          <TransactionWebhook webhook={item?.webhookEventIncoming} />
        </Stack>
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color={item?.solanaFinalizedDuration ? 'green.500' : 'yellow.500'} />
        Solana Finalized {item?.solanaFinalizedDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color={item?.solanaFinalizedDuration ? 'green.500' : 'yellow.500'} />
        Done {item?.totalDuration}ms
      </ListItem>
    </List>
  )
}

function TransactionWebhook({ webhook }: { webhook?: Maybe<AppWebhook> | undefined }) {
  const [visible, setVisible] = useState(false)
  return webhook ? (
    <Stack>
      <Box>
        <Button size="xs" variant="outline" onClick={() => setVisible(!visible)}>
          Inspect {webhook.direction} {webhook.type} Webhook
        </Button>
      </Box>
      {visible && (
        <Box as="pre" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(webhook, null, 2)}
        </Box>
      )}
    </Stack>
  ) : (
    <Box />
  )
}
