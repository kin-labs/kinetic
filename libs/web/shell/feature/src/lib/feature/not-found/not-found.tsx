import { Heading, HStack, Stack } from '@chakra-ui/react'
import { MdError } from 'react-icons/md'

export function NotFound() {
  return (
    <Stack h={'full'} alignItems="center" justifyContent="center">
      <HStack spacing={6} alignItems="center">
        <MdError size={36} />
        <Heading as="h1" size="lg" fontWeight="bold">
          Page not found :(
        </Heading>
      </HStack>
    </Stack>
  )
}
