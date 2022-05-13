import { CheckCircleIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { AppTransaction } from '@mogami/shared/util/admin-sdk'
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
        Processing {item?.processingDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Webhook Verify {item?.webhookVerifyDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Solana {item?.solanaDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Webhook Event {item?.webhookEventDuration}ms
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Done {item?.totalDuration}ms
      </ListItem>
    </List>
  )
}
