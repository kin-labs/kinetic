import { CheckCircleIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { AppCreation } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiCreationTimeline({ item }: { item: AppCreation }) {
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
        Solana {item?.solanaDuration}ms
      </ListItem>
      {/* You can also use custom icons from react-icons */}
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        Done {item?.totalDuration}ms
      </ListItem>
    </List>
  )
}
