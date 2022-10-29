import { Box } from '@chakra-ui/react'

export function WebToolboxUiResult({ result }: { result?: unknown }) {
  return result ? (
    <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="2xs">
      {JSON.stringify(result, null, 2)}
    </Box>
  ) : null
}
