import { Box, Code, HStack, Progress, Stack, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'

export type ConnectionStatus = 'Connecting' | 'Connected' | 'Idle' | 'Failed'

export interface ApiInfo {
  environment: string
  name: string
  version: string
}

export function WebServerUiConnection({ server }: { server: WebServerEntity }) {
  const [error, setError] = useState<string | undefined>()
  const [apiInfo, setApiInfo] = useState<ApiInfo | undefined>()
  const [status, setStatus] = useState<ConnectionStatus>('Idle')

  function testConnection(apiUrl: string) {
    return fetch(apiUrl + '/api/config').then((res) => res.json())
  }

  function msgColor(s: ConnectionStatus) {
    switch (s) {
      case 'Connecting':
        return 'orange'
      case 'Connected':
        return 'primary'
      case 'Idle':
        return 'gray'
      case 'Failed':
        return 'red'
    }
  }

  function statusColor(s: ConnectionStatus) {
    switch (s) {
      case 'Connecting':
        return 'orange.300'
      case 'Connected':
        return 'green.300'
      case 'Idle':
        return 'gray.300'
      case 'Failed':
        return 'red.300'
    }
  }

  function verifyConnection() {
    setStatus('Connecting')
    testConnection(server.endpoint)
      .then((apiInfo: ApiInfo) => {
        setApiInfo(apiInfo)
        setStatus('Connected')
      })
      .catch((error) => {
        setStatus('Failed')
        setError(`${error}`)
        console.log('error', error)
      })
  }

  useEffect(() => {
    if (status === 'Idle') return
    setApiInfo(undefined)
    setError(undefined)
    setStatus('Idle')
  }, [setStatus, server])

  useEffect(() => {
    if (status !== 'Idle') return
    verifyConnection()
  }, [verifyConnection, status])

  return (
    <Stack>
      <HStack align="start" justify="space-between">
        <Box>
          <Tag cursor="pointer" size="sm" onClick={verifyConnection} variant="subtle" colorScheme={msgColor(status)}>
            <TagLeftIcon boxSize="12px" as={GoPrimitiveDot} color={statusColor(status)} />
            <TagLabel>{status}</TagLabel>
          </Tag>
        </Box>
        <Stack>
          {apiInfo ? (
            <Code colorScheme="primary">
              {apiInfo?.name || ''}@{apiInfo?.version || ''}
            </Code>
          ) : status === 'Idle' || status === 'Connecting' ? (
            <Progress size="lg" isIndeterminate colorScheme="primary" />
          ) : null}
        </Stack>
      </HStack>
      {error && <WebUiAlert status={'error'} message={`${error}`} />}
    </Stack>
  )
}
