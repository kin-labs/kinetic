import { EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { Keypair } from '@mogami/keypair'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'
import { Alert, Button, Card, Form, Modal, Textarea } from 'react-daisyui'
import { keypairDb, KeypairEntity } from '../../data-access/keypair'

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
    <div className="flex flex-col space-y-6">
      <div className="">
        Here you can generate and import keypairs using the <code>@mogami/keypair</code> package.
      </div>
      <div className="flex space-x-2">
        <Button onClick={generateMnemonic}>Generate Keypair</Button>
        <Button onClick={() => toggleImportVisible(true)}>Import Mnemonic</Button>
      </div>
      {result?.length ? (
        <div className="grid grid-cols-2 gap-6">
          {result?.map((kp) => (
            <Card key={kp.publicKey} className="bg-base-300">
              <Card.Body>
                <div className="flex justify-between items-center">
                  <code>{kp.publicKey}</code>
                  <div className="flex space-x-2">
                    <button onClick={() => showKeypair(kp)}>
                      <EyeIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <button onClick={() => deleteKeypair(kp.id!)}>
                      <TrashIcon className="w-6 h-6 text-red-500" />
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Alert status="info">
            <div className="font-bold text-lg">No Keypairs found.</div>
            <div>Generate or import one to use the Mogami demo.</div>
          </Alert>
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
    </div>
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
    <Modal open={visible} acceptText="Import" onAccept={submit} onCancel={toggle}>
      <Textarea rows={2} className="w-full" bordered onChange={(e) => setValue(e.target.value)} value={value} />
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
    <Modal open={visible} footer={false}>
      <Form>
        <Form.Label>Mnemonic</Form.Label>
        <Textarea rows={2} className="w-full" bordered value={keypair?.mnemonic} />
        <Form.Label>Public Key</Form.Label>
        <Textarea rows={1} className="w-full" bordered value={keypair?.publicKey} />
        <Form.Label>Secret Key</Form.Label>
        <Textarea rows={1} className="w-full" bordered value={keypair?.secretKey} />
      </Form>
      <div className="modal-action">
        <Button onClick={toggle}>Close</Button>
      </div>
    </Modal>
  )
}
