import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import React from 'react'

export function KeypairDetailsModal({
  toggle,
  keypair,
  visible,
}: {
  toggle: () => void
  keypair?: DemoKeypairEntity | null | undefined
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
