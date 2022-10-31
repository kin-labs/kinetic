import { Code, Stack, Text, useToast } from '@chakra-ui/react'
import { ellipsify } from '@kin-kinetic/web/app/ui'
import { useWebKeypair, WebKeypairEntity } from '@kin-kinetic/web/keypair/data-access'

import { Button, ButtonGroup } from '@saas-ui/react'
import { IconCopy, IconEye, IconEyeOff } from '@tabler/icons'
import { decode } from 'bs58'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdDelete } from 'react-icons/md'

export function WebKeypairUiItem({ keypair }: { keypair?: WebKeypairEntity }) {
  const toast = useToast()
  const { deleteKeypair, selected, updateKeypair } = useWebKeypair()
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
          <Text fontWeight="bold" fontSize="md">
            {keypair.name}
          </Text>
          <Code fontSize="xs" color="gray.200">
            {keypair?.publicKey}
          </Code>
        </Stack>
        <ButtonGroup>
          <Button onClick={() => showDetails(!details)}>
            {details ? <IconEyeOff /> : <IconEye />}
            <Text ml={2}>Secrets</Text>
          </Button>
          <Button onClick={rename}>Rename</Button>
          <Button onClick={() => confirm(keypair)} alignItems="center" disabled={selected?.id === keypair.id}>
            <MdDelete />
            <Text ml={2}>Delete</Text>
          </Button>
        </ButtonGroup>
      </Stack>
      {details ? (
        <ButtonGroup>
          <Copy disabled={!secrets.mnemonic} label={'Copy Mnemonic'} text={secrets.mnemonic ?? ''} />
          <Copy disabled={!secrets.secretKey} label={'Copy Secret Key'} text={secrets.secretKey ?? ''} />
          <Copy disabled={!secrets.byteArray} label={'Copy Byte Array'} text={secrets.byteArray ?? ''} />
        </ButtonGroup>
      ) : null}
    </Stack>
  )
}

function Copy({ disabled, label, text }: { disabled?: boolean; label?: string; text: string }) {
  const toast = useToast()
  return (
    <CopyToClipboard text={text} onCopy={() => toast({ status: 'info', title: 'Copied to clipboard' })}>
      <Button p={2} variant={'outline'} disabled={disabled}>
        <IconCopy color="gray" size={16} />
        {label ? <Text ml={2}>{label}</Text> : null}
      </Button>
    </CopyToClipboard>
  )
}
