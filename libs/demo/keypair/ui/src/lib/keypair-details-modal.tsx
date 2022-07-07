import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { Keypair } from '@kin-kinetic/keypair'
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
  const kp = keypair?.secretKey ? Keypair.fromSecretKey(keypair?.secretKey) : undefined
  return (
    <Modal isOpen={visible} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text mb="8px">Mnemonic</Text>
          <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="scroll" fontSize="xs">
            {JSON.stringify(keypair?.mnemonic, null, 2)}
          </Box>
          <Text mb="8px">Public Key</Text>
          <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="scroll" fontSize="xs">
            {JSON.stringify(keypair?.publicKey, null, 2)}
          </Box>
          <Text mb="8px">Secret Key</Text>
          <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="scroll" fontSize="xs">
            {JSON.stringify(keypair?.secretKey, null, 2)}
          </Box>
          {kp && (
            <Box>
              <Text mb="8px">Byte Array</Text>
              <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="scroll" fontSize="xs">
                [{kp?.solanaSecretKey.toString()}]
              </Box>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
