import { Box } from '@chakra-ui/react'
import { useUptimeQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminHomeFeature() {
  const [{ data }] = useUptimeQuery()
  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          Hello, Admin!
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      </Box>
    </Box>
  )
}
