import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { ServerEntity } from '../../data-access/server'

export function ServerDropdown({
  setServer,
  servers,
}: {
  setServer: (server: ServerEntity) => void
  servers: ServerEntity[]
}) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Select Mogami Server
      </MenuButton>
      <MenuList>
        {servers?.map((server) => (
          <MenuItem onClick={() => setServer(server)} key={server.id}>
            <span>{server.name}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
