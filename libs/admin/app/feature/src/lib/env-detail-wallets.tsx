import { Box } from '@chakra-ui/react'
import React from 'react'
import { EnvDetailLayout } from './env-detail-layout'

export function EnvDetailWallets() {
  return (
    <EnvDetailLayout>
      <Box p="6" borderWidth="1px" borderRadius="lg">
        Wallets
      </Box>
    </EnvDetailLayout>
  )
}
