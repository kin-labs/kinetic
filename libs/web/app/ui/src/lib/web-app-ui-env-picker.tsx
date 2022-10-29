import { Button, ButtonGroup, Stack, Text } from '@chakra-ui/react'
import { App } from '@kin-kinetic/web/util/admin-sdk'
import { Link } from 'react-router-dom'
import { WebAppUiEnvDropdown } from './web-app-ui-env-dropdown'

export function WebAppUiEnvPicker({ app }: { app: App }) {
  return (
    <Stack alignItems="center" direction="row" justifyContent="space-between" pb={3} pt={2} px={4} w="full">
      <Text fontSize="md">Select environment</Text>
      <ButtonGroup>
        {app?.envs?.slice(0, 2)?.map((env) => (
          <Button variant="outline" as={Link} to={`${app.id}/environments/${env.id}`} key={env.id}>
            {env.name}
          </Button>
        ))}
        <WebAppUiEnvDropdown app={app} title="other" />
      </ButtonGroup>
    </Stack>
  )
}
