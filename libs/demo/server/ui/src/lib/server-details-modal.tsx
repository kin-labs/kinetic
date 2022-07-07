import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { DemoServerEntity } from '@kin-kinetic/demo/server/data-access'
import React from 'react'

export function ServerDetailsModal({
  toggle,
  server,
  visible,
}: {
  toggle: () => void
  server?: DemoServerEntity | null | undefined
  visible: boolean
}) {
  return (
    <Modal isOpen={visible} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Server Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="8px">Name</Text>
          <Textarea rows={2} w="full" readOnly value={server?.name} />
          <Text mb="8px">Url</Text>
          <Textarea rows={1} w="full" readOnly value={server?.endpoint} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
