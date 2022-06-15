import { Button, Stack, Text } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { demoServerDb, DemoServerEntity } from '@kin-kinetic/demo/server/data-access'
import { ServerCreateModal, ServerDetailsModal, ServerGrid } from '@kin-kinetic/demo/server/ui'
import { KineticSdkEndpoint, parseKineticSdkEndpoint } from '@kin-kinetic/sdk'
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

  const createServer = (endpoint: KineticSdkEndpoint) => {
    const environment = endpoint.includes('mainnet') ? 'mainnet' : 'devnet'
    const url = parseKineticSdkEndpoint(endpoint)
    const { host } = new URL(url)
    demoServerDb.server.add({ id: host, name: host, endpoint, environment })
    setServerCreateVisible(false)
  }

  return (
    <Stack spacing={6}>
      <Text>Here you can add and configure Kinetic servers.</Text>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="add-server-btn" onClick={() => setServerCreateVisible(true)}>
          Add Server
        </Button>
      </Stack>
      {result?.length ? (
        <ServerGrid servers={result} showServer={showServer} deleteServer={deleteServer} />
      ) : (
        <AdminUiAlert
          cyData="card-servers-warning"
          status="info"
          title="No Servers found."
          message="Add a new one to use the Kinetic demo."
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
