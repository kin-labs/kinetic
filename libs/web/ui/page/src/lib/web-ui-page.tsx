import { Stack } from '@chakra-ui/react'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { ReactNode } from 'react'
import { WebUiPageHeader, WebUiPageHeaderProps } from './web-ui-page-header'

export interface WebUiPageProps extends WebUiPageHeaderProps {
  children: ReactNode
}

export function WebUiPage({ actionLeft, actionRight, children, title }: WebUiPageProps) {
  return (
    <WebUiContainer>
      <Stack spacing={{ base: 2, lg: 6 }}>
        {title && <WebUiPageHeader actionLeft={actionLeft} actionRight={actionRight} title={title} />}
        {children}
      </Stack>
    </WebUiContainer>
  )
}
