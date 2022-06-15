import { CheckCircleIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { AppTransaction } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

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
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Solana Committed {item?.solanaCommittedDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color={item?.webhookEventDuration ? 'green.500' : 'gray.500'} />
        Event Webhook: {item?.webhookEventDuration ? `${item?.webhookEventDuration}ms` : 'disabled'}
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
