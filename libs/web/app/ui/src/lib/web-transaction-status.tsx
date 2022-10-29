import { Tag } from '@chakra-ui/react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { TransactionStatus } from '@kin-kinetic/web/util/admin-sdk'

export function webTransactionStatusColor(status: TransactionStatus): ThemeTypings['colorSchemes'] {
  switch (status) {
    case TransactionStatus.Committed:
      return 'yellow'
    case TransactionStatus.Confirmed:
      return 'blue'
    case TransactionStatus.Failed:
      return 'red'
    case TransactionStatus.Finalized:
      return 'green'
    case TransactionStatus.Processing:
      return 'blue'
    default:
      return 'gray'
  }
}

export function WebTransactionStatus({ status }: { status: TransactionStatus }) {
  return (
    <Tag size={'md'} variant="solid" colorScheme={webTransactionStatusColor(status)}>
      {status?.toString()}
    </Tag>
  )
}
