import { Box } from '@chakra-ui/react'
import React from 'react'

export default function AdminAppFeature() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          App Management
        </Box>
      </Box>
    </Box>
  )
}
