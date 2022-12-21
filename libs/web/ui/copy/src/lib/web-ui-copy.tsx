import { Text, Tooltip, useToast } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { IconCopy } from '@tabler/icons'
import { ReactNode } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export interface WebUiCopyProps {
  disabled?: boolean
  label?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text?: string
}

export function WebUiCopy({ disabled, label, size, text }: WebUiCopyProps) {
  const toast = useToast()

  return (
    <CopyToClipboard
      text={text ?? ''}
      onCopy={() => toast({ status: 'info', title: `Copied ${text?.length} characters to clipboard` })}
    >
      <Tooltip label={`Copy ${text?.length} characters to clipboard `} placement="top">
        <Button p={size} variant="outline" disabled={disabled} size={size}>
          <IconCopy color="gray" size={16} />
          {label ? typeof label === 'string' ? <Text ml={2}>{label}</Text> : label : null}
        </Button>
      </Tooltip>
    </CopyToClipboard>
  )
}
