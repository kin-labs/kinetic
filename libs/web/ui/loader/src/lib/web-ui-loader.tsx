import { Flex, Spinner } from '@chakra-ui/react'

export function WebUiLoader() {
  return (
    <Flex h="full" justifyContent={'center'} alignItems={'center'} py={12}>
      <Spinner color="teal.500" size="xl" />
    </Flex>
  )
}
