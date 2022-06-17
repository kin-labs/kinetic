import { Tooltip } from '@chakra-ui/react'
import React from 'react'

export interface AdminUiAddressProps {
  address: string
  length?: number
}

export function elipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substr(0, len) + '...' + str.substr(str.length - len, str.length)
  }
  return str
}

export function AdminUiAddress({ address, length }: AdminUiAddressProps) {
  return <Tooltip title={address || ''}>{elipsify(address || '', length)}</Tooltip>
}
