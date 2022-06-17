import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { DemoServerEntity } from '@kin-kinetic/demo/server/data-access'
import React from 'react'

export function ServerDropdown({
  selected,
  setServer,
  servers,
}: {
  selected: DemoServerEntity | null
  setServer: (server: DemoServerEntity) => void
  servers: DemoServerEntity[]
}) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selected ? selected.name : 'Select Kinetic Server'}
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
