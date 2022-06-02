import { Box } from '@chakra-ui/react'
import React from 'react'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailTransactions() {
  return (
    <EnvDetailLayout>
      <Box p="6" borderWidth="1px" borderRadius="lg">
        Transactions
      </Box>
    </EnvDetailLayout>
  )
}
