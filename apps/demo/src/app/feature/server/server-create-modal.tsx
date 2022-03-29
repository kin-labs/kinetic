import React, { ChangeEvent, useState } from 'react'
import { Input, Modal } from 'react-daisyui'

export function ServerCreateModal({
  submit,
  toggle,
  visible,
}: {
  submit: (endpoint: string) => void
  toggle: () => void
  visible: boolean
}) {
  const [value, setValue] = useState<string>('http://localhost:3000/api')
  return (
    <Modal open={visible} acceptText="Add" onAccept={() => submit(value)} onCancel={toggle}>
      <Input
        className="w-full"
        bordered
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)}
        value={value}
      />
    </Modal>
  )
}
