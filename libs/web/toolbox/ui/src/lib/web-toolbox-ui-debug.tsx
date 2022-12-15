import { Box } from '@chakra-ui/react'

export function WebToolboxUiDebug({ data }: { data: unknown }) {
  return (
    <Box
      as="pre"
      p="2"
      backgroundColor={'gray.700'}
      color={'gray.300'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      fontSize="2xs"
    >
      {JSON.stringify(data ?? 'No Data', null, 2)}
    </Box>
  )
}
