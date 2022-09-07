import { Text } from '@chakra-ui/react'
import { TransactionStatus } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiTransactionStatus({ status }: { status?: TransactionStatus }) {
  let bgColor = 'yellow.800'
  let borderColor = 'yellow.500'
  let color = 'yellow.200'

  if (status && status === TransactionStatus.Finalized) {
    bgColor = 'green.800'
    borderColor = 'green.500'
    color = 'green.200'
  }
  if (status && status === TransactionStatus.Failed) {
    bgColor = 'red.800'
    borderColor = 'red.500'
    color = 'red.200'
  }
  return (
    <Text
      textAlign="center"
      px={2}
      borderRadius={4}
      borderWidth={1}
      fontSize="xs"
      borderColor={borderColor}
      bgColor={bgColor}
      color={color}
    >
      {status}
    </Text>
  )
}
