import React from 'react'
import { Dropdown } from 'react-daisyui'
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
    <Dropdown hover>
      <Dropdown.Toggle>{elipsify(selected.publicKey)}</Dropdown.Toggle>
      <Dropdown.Menu className="w-52 bg-base-200">
        {keypairs?.map((keypair) => (
          <Dropdown.Item onClick={() => setKeypair(keypair)} key={keypair.id}>
            {elipsify(keypair.publicKey)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
