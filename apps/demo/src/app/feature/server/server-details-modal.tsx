import React from 'react'
import { Button, Form, Modal, Textarea } from 'react-daisyui'
import { ServerEntity } from '../../data-access/server'

export function ServerDetailsModal({
  toggle,
  server,
  visible,
}: {
  toggle: () => void
  server?: ServerEntity | null | undefined
  visible: boolean
}) {
  return (
    <Modal open={visible} footer={false}>
      <Form>
        <Form.Label>Name</Form.Label>
        <Textarea rows={2} className="w-full" bordered value={server?.name} />
        <Form.Label>Url</Form.Label>
        <Textarea rows={1} className="w-full" bordered value={server?.endpoint} />
      </Form>
      <div className="modal-action">
        <Button onClick={toggle}>Close</Button>
      </div>
    </Modal>
  )
}
