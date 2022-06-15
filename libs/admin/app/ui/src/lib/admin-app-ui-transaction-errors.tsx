import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { AppTransaction } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiTransactionErrors({ item }: { item: AppTransaction }) {
  return (
    <List spacing={3}>
      {item.errors?.length ? (
        item.errors?.map((error, i) => (
          <ListItem key={i}>
            <ListIcon as={CloseIcon} color="red.500" />
            {error.type} {error.message}
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          No errors occurred
        </ListItem>
      )}
    </List>
  )
}
