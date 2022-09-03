import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { AdminUiAddress } from '@kin-kinetic/admin/ui/address'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { demoKeypairDb, DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { KeypairDropdown } from '@kin-kinetic/demo/keypair/ui'
import { SdkControlPanel } from '@kin-kinetic/demo/sdk/ui'
import { demoServerDb, DemoServerEntity } from '@kin-kinetic/demo/server/data-access'
import { ServerDropdown } from '@kin-kinetic/demo/server/ui'
import { KineticSdk } from '@kin-kinetic/sdk'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'

export function DemoSdkFeature() {
  const [loading, setLoading] = useState(true)
  const [keypair, setKeypair] = useState<DemoKeypairEntity | null>(null)
  const [server, setServer] = useState<DemoServerEntity | null>(null)
  const [sdk, setSdk] = useState<KineticSdk | null>(null)
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
    setSdk(null)
    setServer(null)
    KineticSdk.setup({
      endpoint: server.endpoint,
      environment: server.environment,
      headers: {
        'kinetic-custom-header': 'yay!',
      },
      index: 1,
      logger: console,
    })
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
      <AdminUiAlert status="warning" title="No Keypairs configured." message="Add a new one on the Keypair page." />
    )
  }

  if (!servers || !servers?.length) {
    return <AdminUiAlert status="warning" title="No Servers configured." message="Add a new one on the Servers page." />
  }

  if (!sdk) {
    return <AdminUiAlert status="error" message={'No SDK configured.'} />
  }
  const link = sdk.getExplorerUrl('/address/' + keypair.publicKey)

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
          <Link target="_blank" href={link}>
            <Button>
              <Text mr={2}>View in Explorer</Text>
              <AdminUiAddress address={keypair.publicKey} />
              <ExternalLinkIcon ml={2} />
            </Button>
          </Link>
        </Box>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <KeypairDropdown selected={keypair} setKeypair={selectKeypair} keypairs={keypairs} />
            <ServerDropdown selected={server} setServer={selectServer} servers={servers} />
          </Stack>
        </Box>
      </Flex>
      <SdkControlPanel keypair={keypair} sdk={sdk} />
    </Stack>
  )
}
