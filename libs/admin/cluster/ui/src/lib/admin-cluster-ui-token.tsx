import { Avatar, Box, Code, Flex, Image, Stack } from '@chakra-ui/react'
import { ClusterToken } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterUiToken({ token }: { token: ClusterToken }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box mt="1" fontWeight="semibold" lineHeight="tight" isTruncated flex={'auto'}>
        <Stack spacing={2}>
          <Box fontSize="xl" as="h4">
            {token?.name} ({token?.symbol})
          </Box>
          <Box>
            <Code colorScheme="teal">{token?.address}</Code>
          </Box>
        </Stack>
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {token?.logoURI ? <Image src={token?.logoURI} h={12} /> : <Avatar name={token.name || 'X'} />}
      </Box>
    </Flex>
  )
}
