import { Link, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export interface AdminUiLink {
  label: string
  path: string
}

export function AdminUiHeaderLink({ link }: { link: AdminUiLink }) {
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      as={RouterLink}
      to={link.path}
    >
      {link.label}
    </Link>
  )
}
