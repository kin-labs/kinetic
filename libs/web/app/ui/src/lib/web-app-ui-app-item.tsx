import { Stack, Text } from '@chakra-ui/react'
import { WebUiAppAvatar } from '@kin-kinetic/web/ui/app-avatar'
import { App } from '@kin-kinetic/web/util/sdk'
import { Link as RouterLink } from 'react-router-dom'

export function WebAppUiAppItem({ app }: { app: App }) {
  return (
    <Stack
      flexGrow={1}
      direction="row"
      alignItems="center"
      spacing={4}
      as={RouterLink}
      to={`/apps/${app?.defaultEnvUrl}`}
    >
      <WebUiAppAvatar logoUrl={app.logoUrl} />
      <Stack alignItems="start" justifyContent="space-between" w="full" spacing={-0.5}>
        <Text fontWeight="semibold">{app?.name}</Text>
        <Text fontSize="xs">{`App index: ${app?.index}`}</Text>
      </Stack>
    </Stack>
  )
}
