import React from 'react'
import { Dropdown } from 'react-daisyui'
import { ServerEntity } from '../../data-access/server'

export function ServerDropdown({
  setServer,
  servers,
}: {
  setServer: (server: ServerEntity) => void
  servers: ServerEntity[]
}) {
  return (
    <Dropdown hover>
      <Dropdown.Toggle>Select Mogami Server</Dropdown.Toggle>
      <Dropdown.Menu className="w-52 bg-base-200">
        {servers?.map((server) => (
          <Dropdown.Item onClick={() => setServer(server)} key={server.id}>
            {server.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
