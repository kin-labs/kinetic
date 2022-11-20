import { chakra } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

export const WebUiNavLink = chakra(NavLink, {
  baseStyle: {},
})

export type WebUiLinks = WebUiLinkProps[]

export interface WebUiLinkProps {
  icon?: ReactElement
  label: string
  path: string
}

export function WebUiLink({ path, label }: WebUiLinkProps) {
  return <WebUiNavLink to={path}>{label}</WebUiNavLink>
}
