import { EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'
import { Alert, Button, Card, Form, Input, Modal, Textarea } from 'react-daisyui'
import { serverDb, ServerEntity } from '../../data-access/server'

export function ServerIndex() {
  const result = useLiveQuery(() => serverDb.server.toArray())
  const [serverDetailsVisible, setServerDetailsVisible] = useState<boolean>(false)
  const [serverCreateVisible, setServerCreateVisible] = useState<boolean>(false)
  const [selectedServer, setSelectedServer] = useState<ServerEntity | null>()

  const deleteServer = (id: string) => serverDb.server.delete(id)

  const showServer = (server: ServerEntity) => {
    setSelectedServer(server)
    setServerDetailsVisible(true)
  }

  const createServer = (endpoint: string) => {
    const { host } = new URL(endpoint)
    serverDb.server.add({ id: host, name: host, endpoint })
    setServerCreateVisible(false)
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="">Here you can add and configure Mogami servers.</div>
      <div className="flex space-x-2">
        <Button onClick={() => setServerCreateVisible(true)}>Add Server</Button>
      </div>
      {result?.length ? (
        <div className="grid grid-cols-2 gap-6">
          {result?.map((server) => (
            <Card key={server.id} className="bg-base-300">
              <Card.Body>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-2">
                    <code>{server.name}</code>
                    <span className="text-sm">{server.endpoint}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => showServer(server)}>
                      <EyeIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <button onClick={() => deleteServer(server.id!)}>
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
            <div className="font-bold text-lg">No Servers found.</div>
            <div>Add a new one to use the Mogami demo.</div>
          </Alert>
        </div>
      )}
      <ServerCreateModal
        visible={serverCreateVisible}
        toggle={() => setServerCreateVisible(false)}
        submit={createServer}
      />
      <ServerDetailsModal
        server={selectedServer}
        toggle={() => setServerDetailsVisible(false)}
        visible={serverDetailsVisible}
      />
    </div>
  )
}

function ServerCreateModal({
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
    <Modal open={visible} acceptText="Import" onAccept={() => submit(value)} onCancel={toggle}>
      <Input className="w-full" bordered onChange={(e) => setValue(e.target.value)} value={value} />
    </Modal>
  )
}

function ServerDetailsModal({
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
