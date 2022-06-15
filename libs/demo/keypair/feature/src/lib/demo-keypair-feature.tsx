import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Code, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { demoKeypairDb, DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { ImportMnemonicModal, KeypairDetailsModal, ImportByteArrayModal } from '@kin-kinetic/demo/keypair/ui'
import { Keypair } from '@kin-kinetic/keypair'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'

export function DemoKeypairFeature() {
  const result = useLiveQuery(() => demoKeypairDb.keypair.toArray())
  const [keypairVisible, toggleKeypairVisible] = useState<boolean>(false)
  const [importVisible, toggleImportVisible] = useState<boolean>(false)
  const [importByteArrayVisible, toggleImportByteArrayVisible] = useState<boolean>(false)
  const [mnemonicImport, setMnemonicImport] = useState<string>('')
  const [byteArrayImport, setByteArrayImport] = useState<string>('')
  const [selectedKeypair, setSelectedKeypair] = useState<DemoKeypairEntity | null>()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const deleteKeypair = (kp: DemoKeypairEntity) => demoKeypairDb.keypair.delete(kp.id!)

  const generateMnemonic = async () => storeMnemonic(Keypair.generateMnemonic())

  const importMnemonic = () => {
    // Save it
    storeMnemonic(mnemonicImport)
    // Reset input
    setMnemonicImport('')
    // Close Modal
    toggleImportVisible(false)
  }

  const importByteArray = () => {
    // Save it
    storeByteArray(byteArrayImport)
    // Reset input
    setByteArrayImport('')
    // Close Modal
    toggleImportByteArrayVisible(false)
  }

  const showKeypair = (kp: DemoKeypairEntity) => {
    setSelectedKeypair(kp)
    toggleKeypairVisible(true)
  }
  const storeMnemonic = (mnemonic: string) => {
    const [kp] = Keypair.fromMnemonicSet(mnemonic, 0, 1)
    demoKeypairDb.keypair.add({ id: kp.publicKey, mnemonic, publicKey: kp.publicKey, secretKey: kp.secretKey })
  }

  const storeByteArray = (byteArray: string) => {
    const kp = Keypair.fromByteArray(JSON.parse(byteArray))
    demoKeypairDb.keypair.add({ id: kp.publicKey, publicKey: kp.publicKey, secretKey: kp.secretKey })
  }

  return (
    <Stack spacing={6}>
      <div>
        Here you can generate and import keypairs using the <code>@kin-kinetic/keypair</code> package.
      </div>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className={'generate-keypair-btn'} onClick={generateMnemonic}>
          Generate Keypair
        </Button>
        <Button className={'import-mnemonic-btn'} onClick={() => toggleImportVisible(true)}>
          Import Mnemonic
        </Button>
        <Button className={'import-bytearray-btn'} onClick={() => toggleImportByteArrayVisible(true)}>
          Import ByteArray
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
                  <Button size="xs" onClick={() => deleteKeypair(kp)}>
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <div>
          <AdminUiAlert
            cyData="card-keypair-warning"
            status="info"
            title="No Keypairs found."
            message="Generate or import one to use the Kinetic demo."
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
      <ImportByteArrayModal
        setValue={setByteArrayImport}
        submit={importByteArray}
        value={byteArrayImport}
        toggle={() => toggleImportByteArrayVisible(false)}
        visible={importByteArrayVisible}
      />
      <KeypairDetailsModal
        keypair={selectedKeypair}
        toggle={() => toggleKeypairVisible(false)}
        visible={keypairVisible}
      />
    </Stack>
  )
}
