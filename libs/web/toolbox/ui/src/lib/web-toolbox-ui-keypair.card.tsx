import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Stack, Text } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { Button, ButtonGroup } from '@saas-ui/react'
import { IconEye, IconEyeOff } from '@tabler/icons'
import { useState } from 'react'
import { WebToolboxUiDebug } from './web-toolbox-ui-debug'

export function WebToolboxUiKeypairCard({ keypair, explorer }: { keypair?: Keypair; explorer?: string }) {
  const [details, showDetails] = useState<boolean>(false)

  return (
    <Stack p="6" backgroundColor={'gray.800'} borderWidth="1px" borderRadius="lg" spacing={{ base: 2, md: 6 }}>
      <Alert
        status="warning"
        variant="solid"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="250px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} fontSize="lg">
          Your keypair secret is stored unencrypted in your browser's local storage.
        </AlertTitle>
        <AlertTitle my={4} fontSize="2xl" color={'red.700'}>
          Please do not use this keypair for any real funds.
        </AlertTitle>
        <AlertDescription>This keypair and the toolbox are for development purposes only.</AlertDescription>
      </Alert>
      <Flex justify="space-between" align="start">
        <ButtonGroup>
          <Button size="lg" as="a" href={explorer} target="_blank">
            {keypair?.publicKey}
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="lg" variant="outline" disabled={!keypair?.mnemonic} onClick={() => showDetails(!details)}>
            {details ? <IconEyeOff /> : <IconEye />}
            <Text ml={2}>Secrets</Text>
          </Button>
        </ButtonGroup>
      </Flex>
      {details && (
        <WebToolboxUiDebug
          data={{
            byteArray: `[${keypair?.solanaSecretKey?.join(',')}]`,
            mnemonic: keypair?.mnemonic,
          }}
        />
      )}
    </Stack>
  )
}
