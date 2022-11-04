import { HStack, Stack } from '@chakra-ui/react'
import { useWebServer } from '@kin-kinetic/web/server/data-access'
import { Button, Form, Select } from '@saas-ui/react'
import { Link } from 'react-router-dom'
import { WebServerUiConnection } from './web-server-ui-connection'

export function WebServerUiConnectionPanel() {
  const { servers, selected, selectServer } = useWebServer()

  const noop = () => {
    console.log('🤷‍')
  }
  const selectById = (id: string) => {
    const found = servers?.find((s) => `${s.id}` === id)
    if (found) {
      selectServer(found)
    }
  }
  return (
    <Stack spacing={4}>
      <HStack align="center">
        <Form flex={1} onSubmit={(item) => noop}>
          <Select
            defaultValue={selected?.name}
            onChange={(id) => selectById(id as string)}
            placeholder="Select a country"
            options={
              servers?.map((server) => ({
                label: server.endpoint,
                value: `${server.id}`,
              })) || []
            }
          />
        </Form>

        <Button variant="outline" as={Link} to="/servers" label="Manage" />
      </HStack>
      {selected && <WebServerUiConnection server={selected} />}
    </Stack>
  )
}
