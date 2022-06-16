import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { generateSvgDataUrl } from './gradient-avatar/gradient-avatars'

export interface WebUiIdenticonProps {
  name?: string | null
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function AdminUiIdenticon({ name, size }: WebUiIdenticonProps) {
  return <Avatar size={size} src={generateSvgDataUrl({ name: name || 'kinetic' })}></Avatar>
}
