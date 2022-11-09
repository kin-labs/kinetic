import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { useWebKeypair } from '@kin-kinetic/web/keypair/data-access'
import { WebKeypairUiImport, WebKeypairUiItem } from '@kin-kinetic/web/keypair/ui'
import { Button, ButtonGroup } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiExplorerLink } from './web-toolbox-ui-explorer-link'

export function WebToolboxUiKeypairCard({ keypair, explorer }: { keypair?: Keypair; explorer?: string }) {
  const toast = useToast()
  const [details, showDetails] = useState<boolean>(false)
  const [importForm, showImportForm] = useState<boolean>(false)
  const { addKeypair, generateKeypair, keypairs, selected } = useWebKeypair()
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.900', 'gray.300')

  const importKeypair = ({ secret }: { secret: string }) => {
    if (!secret) {
      toast({
        title: 'Error',
        description: 'Please enter a secret',
        status: 'error',
        duration: 5000,
      })
    }
    const isMnemonic = secret.split(' ').length === 12 || secret.split(' ').length === 24
    if (isMnemonic) {
      const { publicKey, secretKey, mnemonic } = Keypair.fromMnemonic(secret)
      addKeypair({ publicKey, secretKey, mnemonic })
      toast({
        title: 'Keypair imported',
        description: 'Keypair imported from mnemonic',
        status: 'success',
        duration: 5000,
      })
      return
    }
    const isByteArray = secret.startsWith('[') && secret.endsWith(']')
    if (isByteArray) {
      try {
        const parsed: number[] = JSON.parse(secret)
        const { publicKey, secretKey, mnemonic } = Keypair.fromByteArray(parsed)
        addKeypair({ publicKey, secretKey, mnemonic })
        toast({
          title: 'Keypair imported',
          description: 'Keypair imported from byte array',
          status: 'success',
          duration: 5000,
        })
        return
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Invalid byte array',
          status: 'error',
        })
        return
      }
    }

    const { publicKey, secretKey, mnemonic } = Keypair.fromSecretKey(secret)
    addKeypair({ publicKey, secretKey, mnemonic })
    toast({
      title: 'Keypair imported',
      description: 'Keypair imported from secret key',
      status: 'success',
      duration: 5000,
    })
  }

  return (
    <Stack p="6" bg={bg} color={color} borderWidth="1px" borderRadius="lg" spacing={{ base: 2, md: 6 }}>
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
          The secrets of your keypairs are stored UNENCRYPTED in your browser's local storage.
        </AlertTitle>
        <AlertTitle my={4} fontSize="2xl" color={'red.700'}>
          Please do not use these keypairs for any real funds.
        </AlertTitle>
        <AlertDescription>These keypairs and the toolbox are for development purposes only.</AlertDescription>
      </Alert>
      <Flex justify="space-between" align="start">
        <ButtonGroup alignItems={'center'}>
          <Button disabled variant="outline" size="lg">
            {selected?.name}
          </Button>
          <WebToolboxUiExplorerLink href={explorer} />
        </ButtonGroup>
        <ButtonGroup>
          <Button size="lg" variant="outline" onClick={() => showDetails(!details)}>
            <Text>Manage Keypairs</Text>
          </Button>
        </ButtonGroup>
      </Flex>
      {details && (
        <Stack>
          <Stack direction="row" p={4} borderWidth="1px" borderRadius="lg" justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">
              Keypairs found: {keypairs?.length}
            </Text>
            <ButtonGroup>
              <Button size="sm" variant="outline" onClick={() => generateKeypair()}>
                Generate Keypair
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  console.log('importForm', importForm)
                  showImportForm(!importForm)
                }}
              >
                Import Keypair
              </Button>
            </ButtonGroup>
          </Stack>
          {importForm ? 'Yes' : 'No'}
          {importForm ? <WebKeypairUiImport onSubmit={importKeypair} /> : null}
          {keypairs?.map((keypair, index) => (
            <WebKeypairUiItem key={keypair.id} keypair={keypair} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
