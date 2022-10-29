import { IconButton } from '@chakra-ui/react'
import { MdChevronLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

export function WebUiPageBackButton({ to = '..' }: { to?: string }) {
  return <IconButton aria-label={'back'} icon={<MdChevronLeft size="32px" />} variant="outline" as={Link} to={to} />
}
