import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

export function ImportByteArrayModal({
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
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setValue(ev.target.value)}
            value={value.toString()}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={submit}>
            Import
          </Button>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
