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
  submit: (endpoint: string) => void
  toggle: () => void
  visible: boolean
}) {
  const [value, setValue] = useState<string>('http://1.local.mogami.kin.org:3000')
  return (
    <Modal isOpen={visible} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Server</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input w="full" onChange={(ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)} value={value} />
        </ModalBody>
        <ModalFooter>
          <Button className="submit" colorScheme="teal" mr={3} onClick={() => submit(value)}>
            Add
          </Button>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
