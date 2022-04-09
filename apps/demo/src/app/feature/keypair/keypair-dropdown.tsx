import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { KeypairEntity } from '../../data-access/keypair'

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
  keypairs: KeypairEntity[]
  setKeypair: (keypair: KeypairEntity) => void
  selected: KeypairEntity
}) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Select Mogami Server
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
