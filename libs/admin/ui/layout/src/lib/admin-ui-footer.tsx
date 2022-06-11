import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export function AdminUiFooter({ copyright }: { copyright: ReactNode }) {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.600', 'gray.500')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} />
        <Flex alignItems={'center'}>
          <Box>{copyright}</Box>
        </Flex>
      </Flex>
    </Box>
  )
}
