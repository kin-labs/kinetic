import { Button } from '@chakra-ui/react'
import { WebUiTooltip } from '@kin-kinetic/web/ui/tooltip'
import { MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'

export interface WebAppUiSettingsLinkProps {
  label: string
  to: string
}

export function WebUiSettingsLink({ label, to }: WebAppUiSettingsLinkProps) {
  return (
    <WebUiTooltip label={label}>
      <Button alignItems="center" as={Link} fontSize={'xl'} justifyContent={'center'} p={2} to={to} variant="ghost">
        <MdSettings />
      </Button>
    </WebUiTooltip>
  )
}
