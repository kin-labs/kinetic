import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export interface WebUiDataTableLinkProps {
  to: string
  value: string
}

export function WebUiDataTableLink({ to, value }: WebUiDataTableLinkProps) {
  return (
    <Link as={RouterLink} to={to} color="primary.500">
      {value}
    </Link>
  )
}
