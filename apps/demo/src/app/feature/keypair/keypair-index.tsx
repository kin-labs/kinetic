import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Keypair } from '@mogami/keypair'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { ChangeEvent, useState } from 'react'
import { keypairDb, KeypairEntity } from '../../data-access/keypair'
import { UiAlert } from '../../ui/ui-alert/ui-alert'

export function KeypairIndex() {
  const result = useLiveQuery(() => keypairDb.keypair.toArray())
  const [keypairVisible, toggleKeypairVisible] = useState<boolean>(false)
  const [importVisible, toggleImportVisible] = useState<boolean>(false)
  const [mnemonicImport, setMnemonicImport] = useState<string>('')
  const [selectedKeypair, setSelectedKeypair] = useState<KeypairEntity | null>()

  const deleteKeypair = (id: string) => keypairDb.keypair.delete(id)

  const generateMnemonic = async () => storeMnemonic(Keypair.generateMnemonic())

  const importMnemonic = () => {
    // Save it
    storeMnemonic(mnemonicImport)
    // Reset input
    setMnemonicImport('')
    // Close Modal
    toggleImportVisible(false)
  }

  const showKeypair = (kp: any) => {
    setSelectedKeypair(kp)
    toggleKeypairVisible(true)
  }
  const storeMnemonic = (mnemonic: string) => {
    const [kp] = Keypair.fromMnemonicSet(mnemonic, 0, 1)
    keypairDb.keypair.add({ id: kp.publicKey, mnemonic, publicKey: kp.publicKey, secretKey: kp.secretKey })
  }

  return (
    <Stack spacing={6}>
      <div>
        Here you can generate and import keypairs using the <code>@mogami/keypair</code> package.
      </div>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className={'generate-keypair-btn'} onClick={generateMnemonic}>
          Generate Keypair
        </Button>
        <Button className={'import-mnemonic-btn'} onClick={() => toggleImportVisible(true)}>
          Import Mnemonic
        </Button>
      </Stack>
      {result?.length ? (
        <SimpleGrid columns={[1, 2]} gap={[3, 6]}>
          {result?.map((kp) => (
            <Box key={kp.publicKey} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} bg="gray.800">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Code>{kp.publicKey}</Code>
                </Box>
                <ButtonGroup variant="outline" spacing="2">
                  <Button size="xs" onClick={() => showKeypair(kp)} colorScheme="teal">
                    <ViewIcon className="keypair-eye-icon" />
                  </Button>
                  <Button size="xs" onClick={() => deleteKeypair(kp.id!)}>
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <div>
          <UiAlert
            cyData="card-keypair-warning"
            status="info"
            title="No Keypairs found."
            message="Generate or import one to use the Mogami demo."
          />
        </div>
      )}

      <ImportMnemonicModal
        setValue={setMnemonicImport}
        submit={importMnemonic}
        value={mnemonicImport}
        toggle={() => toggleImportVisible(false)}
        visible={importVisible}
      />
      <KeypairDetailsModal
        keypair={selectedKeypair}
        toggle={() => toggleKeypairVisible(false)}
        visible={keypairVisible}
      />
    </Stack>
  )
}

function ImportMnemonicModal({
  setValue,
  submit,
  toggle,
  value,
  visible,
}: {
  setValue: (value: string) => void
  submit: () => void
  toggle: () => void
  value: string
  visible: boolean
}) {
  return (
    <Modal isOpen={visible} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            rows={2}
            w="full"
            className="import-mnemonic"
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setValue(ev.target.value)}
            value={value}
          />
        </ModalBody>
        <ModalFooter>
          <Button className="submit" colorScheme="teal" mr={3} onClick={submit}>
            Import
          </Button>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function KeypairDetailsModal({
  toggle,
  keypair,
  visible,
}: {
  toggle: () => void
  keypair?: KeypairEntity | null | undefined
  visible: boolean
}) {
  return (
    <Modal isOpen={visible} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text mb="8px">Mnemonic</Text>
          <Textarea rows={2} w="full" className="text-area-mnemonic" readOnly value={keypair?.mnemonic} />
          <Text mb="8px">Public Key</Text>
          <Textarea rows={1} w="full" className="text-area-public-key" readOnly value={keypair?.publicKey} />
          <Text mb="8px">Secret Key</Text>
          <Textarea rows={1} w="full" className="text-area-secret-key" readOnly value={keypair?.secretKey} />
        </ModalBody>
        <ModalFooter>
          <Button className="close" colorScheme="teal" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
