import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export function AdminUiLoader() {
  return (
    <Flex h="full" justifyContent={'center'} alignItems={'center'}>
      <Spinner color="teal.500" size="xl" />
    </Flex>
  )
}
