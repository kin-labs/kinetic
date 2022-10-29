import { Alert, AlertDescription, AlertTitle, Button, Stack, Text } from '@chakra-ui/react'
import { demoServerDb, DemoServerEntity } from '@kin-kinetic/demo/server/data-access'
import { ServerCreateModal, ServerDetailsModal, ServerGrid } from '@kin-kinetic/demo/server/ui'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'

export function DemoServerFeature() {
  const result = useLiveQuery(() => demoServerDb.server.toArray())
  const [serverDetailsVisible, setServerDetailsVisible] = useState<boolean>(false)
  const [serverCreateVisible, setServerCreateVisible] = useState<boolean>(false)
  const [selectedServer, setSelectedServer] = useState<DemoServerEntity | null>()

  const deleteServer = (server: DemoServerEntity) => demoServerDb.server.delete(server.id)

  const showServer = (server: DemoServerEntity) => {
    setSelectedServer(server)
    setServerDetailsVisible(true)
  }

  const createServer = (endpoint: string, environment: string) => {
    const { host } = new URL(endpoint)
    demoServerDb.server.add({ id: `${host}-${environment}`, name: `${host} / ${environment}`, endpoint, environment })
    setServerCreateVisible(false)
  }

  return (
    <Stack spacing={6}>
      <Text>Here you can add and configure Kinetic servers.</Text>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={() => setServerCreateVisible(true)}>Add Server</Button>
        <Button onClick={() => createServer('http://localhost:3000/', 'local')}>Add Local</Button>
        <Button onClick={() => createServer('devnet', 'devnet')}>Add Devnet</Button>
      </Stack>
      {result?.length ? (
        <ServerGrid servers={result} showServer={showServer} deleteServer={deleteServer} />
      ) : (
        <Alert status="info">
          <AlertTitle>No Servers found.</AlertTitle>
          <AlertDescription>Add a new one to use the Kinetic demo.</AlertDescription>
        </Alert>
      )}
      <ServerCreateModal
        visible={serverCreateVisible}
        toggle={() => setServerCreateVisible(false)}
        submit={createServer}
      />
      <ServerDetailsModal
        server={selectedServer}
        toggle={() => setServerDetailsVisible(false)}
        visible={serverDetailsVisible}
      />
    </Stack>
  )
}
