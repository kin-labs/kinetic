import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'

export function ServerCreateModal({
  submit,
  toggle,
  visible,
}: {
  submit: (endpoint: string, environment: string) => void
  toggle: () => void
  visible: boolean
}) {
  const [endpoint, setEndpoint] = useState<string>('http://localhost:3000')
  const [environment, setEnvironment] = useState<string>('custom')
  return (
    <Modal isOpen={visible} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Server</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            w="full"
            onChange={(ev: ChangeEvent<HTMLInputElement>) => setEndpoint(ev.target.value)}
            value={endpoint}
          />
          <Input
            w="full"
            onChange={(ev: ChangeEvent<HTMLInputElement>) => setEnvironment(ev.target.value)}
            value={environment}
          />
        </ModalBody>
        <ModalFooter>
          <Button className="submit" colorScheme="teal" mr={3} onClick={() => submit(endpoint, environment)}>
            Add
          </Button>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
