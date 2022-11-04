import { Tooltip } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface WebUiTooltipProps {
  children: ReactNode
  label: string
}

export function WebUiTooltip({ children, label }: WebUiTooltipProps) {
  return (
    <Tooltip bg="primary.500" borderRadius={'8px'} color="gray.50" fontSize="md" hasArrow label={label} px={4} py={1}>
      {children}
    </Tooltip>
  )
}
