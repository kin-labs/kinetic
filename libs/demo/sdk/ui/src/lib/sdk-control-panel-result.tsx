import { Box } from '@chakra-ui/react'
import React from 'react'

export function SdkControlPanelResult({ data }: { data: unknown }) {
  return data ? (
    <Box
      as="pre"
      marginY={6}
      p={4}
      fontSize="xs"
      bg="gray.900"
      color="gray.400"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
    </Box>
  ) : null
}
