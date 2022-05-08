import { Box, Button, Flex, Stack, useColorModeValue } from '@chakra-ui/react'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { demoKeypairDb, DemoKeypairEntity } from '@mogami/demo/keypair/data-access'
import { KeypairDropdown } from '@mogami/demo/keypair/ui'
import { SdkControlPanel } from '@mogami/demo/sdk/ui'
import { demoServerDb, DemoServerEntity } from '@mogami/demo/server/data-access'
import { ServerDropdown } from '@mogami/demo/server/ui'
import { MogamiSdk } from '@mogami/sdk'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

export function DemoSdkFeature() {
  const [loading, setLoading] = useState(true)
  const [keypair, setKeypair] = useState<DemoKeypairEntity | null>(null)
  const [server, setServer] = useState<DemoServerEntity | null>(null)
  const [sdk, setSdk] = useState<MogamiSdk | null>(null)
  const headerColor = useColorModeValue('gray.100', 'gray.900')

  const keypairs = useLiveQuery(() =>
    demoKeypairDb.keypair.toArray().then((res) => {
      if (res.length) {
        selectKeypair(res[0])
      }
      setLoading(false)
      return res
    }),
  )

  const servers = useLiveQuery(() =>
    demoServerDb.server.toArray().then((res) => {
      if (res.length) {
        selectServer(res[0])
      }
      setLoading(false)
      return res
    }),
  )

  const selectKeypair = (keypair: DemoKeypairEntity) => {
    setLoading(true)
    setTimeout(() => {
      setKeypair(() => keypair)
      setLoading(false)
    }, 10)
  }

  const selectServer = (server: DemoServerEntity) => {
    MogamiSdk.setup({ endpoint: server.endpoint, index: 1 })
      .then((sdk) => {
        setSdk(sdk)
        setServer(server)
      })
      .catch((err) => {
        console.log('An error occurred:', err)
      })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!keypairs || !keypairs?.length || !keypair) {
    return (
      <AdminUiAlert
        cyData="card-sdk-warning"
        status="warning"
        title="No Keypairs configured."
        message="Add a new one on the Keypair page."
      />
    )
  }

  if (!servers || !servers?.length) {
    return (
      <AdminUiAlert
        cyData="card-sdk-warning"
        status="warning"
        title="No Servers configured."
        message="Add a new one on the Servers page."
      />
    )
  }

  return (
    <Stack spacing={6}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg={headerColor}
        p={4}
        borderWidth="1px"
        borderRadius="md"
      >
        <Box>
          <Button color="ghost" disabled>
            {server?.name}
          </Button>
        </Box>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <KeypairDropdown selected={keypair} setKeypair={selectKeypair} keypairs={keypairs} />
            <ServerDropdown selected={server} setServer={selectServer} servers={servers} />
          </Stack>
        </Box>
      </Flex>
      {sdk ? (
        <SdkControlPanel keypair={keypair} sdk={sdk} />
      ) : (
        <AdminUiAlert status="error" message={'No SDK configured.'} />
      )}
    </Stack>
  )
}
