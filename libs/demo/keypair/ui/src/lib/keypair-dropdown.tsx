import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { DemoKeypairEntity } from '@mogami/demo/keypair/data-access'
import React from 'react'

export function elipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '...' + str.substring(str.length - len, str.length)
  }
  return str
}

export function KeypairDropdown({
  keypairs,
  setKeypair,
  selected,
}: {
  keypairs: DemoKeypairEntity[]
  setKeypair: (keypair: DemoKeypairEntity) => void
  selected: DemoKeypairEntity
}) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selected ? elipsify(selected.publicKey) : 'Select Keypair'}
      </MenuButton>
      <MenuList>
        {keypairs?.map((keypair) => (
          <MenuItem onClick={() => setKeypair(keypair)} key={keypair.id}>
            <span>{elipsify(keypair.publicKey)}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
