import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
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
      <Alert status="warning">
        <AlertTitle>No Keypairs configured.</AlertTitle>
        <AlertDescription>Add a new one on the Keypair page.</AlertDescription>
      </Alert>
    )
  }

  if (!servers || !servers?.length) {
    return (
      <Alert status="warning">
        <AlertTitle>No Servers configured.</AlertTitle>
        <AlertDescription>Add a new one on the Servers page.</AlertDescription>
      </Alert>
    )
  }

  if (!sdk) {
    return (
      <Alert status="error">
        <AlertTitle>No SDK configured</AlertTitle>
      </Alert>
    )
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
              <DemoUiAddress address={keypair.publicKey} />
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

export interface DemoUiAddressProps {
  address: string
  length?: number
}

export function elipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substr(0, len) + '...' + str.substr(str.length - len, str.length)
  }
  return str
}

export function DemoUiAddress({ address, length }: DemoUiAddressProps) {
  return <Tooltip title={address || ''}>{elipsify(address || '', length)}</Tooltip>
}
