import { Code, Stack, Text, useToast } from '@chakra-ui/react'
import { ellipsify } from '@kin-kinetic/web/app/ui'
import { useWebKeypair, WebKeypairEntity } from '@kin-kinetic/web/keypair/data-access'
import { WebUiCopy } from '@kin-kinetic/web/ui/copy'

import { Button, ButtonGroup } from '@saas-ui/react'
import { IconEye, IconEyeOff } from '@tabler/icons'
import { decode } from 'bs58'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'

export function WebKeypairUiItem({ keypair }: { keypair?: WebKeypairEntity }) {
  const toast = useToast()
  const { deleteKeypair, selected, selectKeypair, updateKeypair } = useWebKeypair()
  const [details, showDetails] = useState<boolean>(false)

  const confirm = (keypair: WebKeypairEntity) => {
    if (!keypair.id) return
    if (window.confirm(`Are you sure you want to delete keypair with public key ${keypair.publicKey}?`)) {
      deleteKeypair(keypair.id)
      toast({
        title: 'Keypair deleted.',
        description: `${keypair.publicKey}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  const rename = () => {
    const name = window.prompt('Enter a new name for this keypair', keypair?.name)
    if (keypair?.id) {
      updateKeypair({ id: keypair?.id, name: name ?? ellipsify(keypair.publicKey) })
    }
  }

  if (!keypair?.id) {
    return null
  }

  const secrets = {
    mnemonic: keypair.mnemonic,
    secretKey: keypair.secretKey,
    byteArray: `[${decode(keypair.secretKey ?? '').join(',')}]`,
  }

  return (
    <Stack p={4} borderWidth="1px" borderRadius="lg">
      <Stack direction="row" justify="space-between" align="top">
        <Stack>
          <ButtonGroup>
            <Button
              onClick={() => selectKeypair(keypair.id ?? 0)}
              variant={keypair.id === selected?.id ? 'primary' : 'outline'}
            >
              <Text fontWeight="bold" fontSize="md">
                {keypair.name}
              </Text>
            </Button>
            <Button onClick={() => selectKeypair(keypair.id ?? 0)}>Select</Button>
            <Button onClick={rename}>Rename</Button>
          </ButtonGroup>
          <Code fontSize="xs" color="gray.200">
            {keypair?.publicKey}
          </Code>
        </Stack>
        <Stack align={'end'}>
          <ButtonGroup>
            <Button onClick={() => showDetails(!details)}>
              {details ? <IconEyeOff /> : <IconEye />}
              <Text ml={2}>Secrets</Text>
            </Button>

            <Button onClick={() => confirm(keypair)} alignItems="center" disabled={selected?.id === keypair.id}>
              <MdDelete />
              <Text ml={2}>Delete</Text>
            </Button>
          </ButtonGroup>
          {details ? (
            <ButtonGroup>
              <WebUiCopy disabled={!secrets.mnemonic} label={'Copy Mnemonic'} text={secrets.mnemonic ?? ''} />
              <WebUiCopy disabled={!secrets.secretKey} label={'Copy Secret Key'} text={secrets.secretKey ?? ''} />
              <WebUiCopy disabled={!secrets.byteArray} label={'Copy Byte Array'} text={secrets.byteArray ?? ''} />
            </ButtonGroup>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  )
}
