import { Text } from '@chakra-ui/react'
import { AppTransactionStatus } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiTransactionStatus({ status }: { status?: AppTransactionStatus }) {
  let bgColor = 'yellow.800'
  let borderColor = 'yellow.500'
  let color = 'yellow.200'

  if (status && status === AppTransactionStatus.Finalized) {
    bgColor = 'green.800'
    borderColor = 'green.500'
    color = 'green.200'
  }
  if (status && status === AppTransactionStatus.Failed) {
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
