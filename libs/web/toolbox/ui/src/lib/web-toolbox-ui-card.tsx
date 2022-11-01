import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { Button, ButtonGroup } from '@saas-ui/react'
import { IconEye, IconEyeOff } from '@tabler/icons'
import { ReactNode, useState } from 'react'
import { WebToolboxUiDebug } from './web-toolbox-ui-debug'
import { WebToolboxUiExplorerLink } from './web-toolbox-ui-explorer-link'

export function WebToolboxUiCard({
  children,
  response,
  error,
  explorer,
}: {
  children: ReactNode
  response?: any
  error?: any
  explorer?: string
}) {
  const [details, showDetails] = useState<boolean>(false)
  const [errorDetails, showErrorDetails] = useState<boolean>(false)

  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.900', 'gray.300')
  return (
    <Stack p="6" bg={bg} color={color} borderWidth="1px" borderRadius="lg" spacing={{ base: 2, md: 6 }}>
      <Flex justify="space-between" align="start">
        {children}
        <ButtonGroup>
          {explorer && <WebToolboxUiExplorerLink href={explorer} />}
          <Box>
            <Button disabled={!error} size="lg" variant="outline" onClick={() => showErrorDetails(!errorDetails)}>
              {errorDetails ? <IconEyeOff /> : <IconEye />}
              <Text ml={2}>Errors</Text>
            </Button>
          </Box>
          <Button size="lg" variant="outline" disabled={!response} onClick={() => showDetails(!details)}>
            {details ? <IconEyeOff /> : <IconEye />}
            <Text ml={2}>Response</Text>
          </Button>
        </ButtonGroup>
      </Flex>
      {details && <WebToolboxUiDebug data={response} />}
      {errorDetails && (
        <Stack>
          <WebUiAlert status={'error'} message={'An error occurred...'} />
          <WebToolboxUiDebug data={error} />
        </Stack>
      )}
    </Stack>
  )
}
