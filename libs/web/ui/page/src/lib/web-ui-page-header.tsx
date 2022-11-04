import { Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface WebUiPageHeaderProps {
  actionLeft?: ReactNode
  actionRight?: ReactNode
  title?: ReactNode
}

export function WebUiPageHeader({ actionLeft, actionRight, title }: WebUiPageHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {actionLeft}
      <Text px={2} fontWeight="semibold" fontSize={{ base: 'xl', lg: '2xl' }}>
        {title || ''}
      </Text>
      {actionRight}
    </Stack>
  )
}
