import { Button, Stack, Text } from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'
import { serverDb, ServerEntity } from '../../data-access/server'
import { UiAlert } from '../../ui/ui-alert/ui-alert'
import { ServerCreateModal } from './server-create-modal'
import { ServerDetailsModal } from './server-details-modal'
import { ServerGrid } from './server-grid'

export function ServerIndex() {
  const result = useLiveQuery(() => serverDb.server.toArray())
  const [serverDetailsVisible, setServerDetailsVisible] = useState<boolean>(false)
  const [serverCreateVisible, setServerCreateVisible] = useState<boolean>(false)
  const [selectedServer, setSelectedServer] = useState<ServerEntity | null>()

  const deleteServer = (server: ServerEntity) => serverDb.server.delete(server.id)

  const showServer = (server: ServerEntity) => {
    setSelectedServer(server)
    setServerDetailsVisible(true)
  }

  const createServer = (endpoint: string) => {
    const { host } = new URL(endpoint)
    serverDb.server.add({ id: host, name: host, endpoint })
    setServerCreateVisible(false)
  }

  return (
    <Stack spacing={6}>
      <Text>Here you can add and configure Mogami servers.</Text>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="add-server-btn" onClick={() => setServerCreateVisible(true)}>
          Add Server
        </Button>
      </Stack>
      {result?.length ? (
        <ServerGrid servers={result} showServer={showServer} deleteServer={deleteServer} />
      ) : (
        <UiAlert
          cyData="card-servers-warning"
          status="info"
          title="No Servers found."
          message="Add a new one to use the Mogami demo."
        />
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
