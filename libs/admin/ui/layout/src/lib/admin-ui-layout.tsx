import { Container, Flex } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactNode } from 'react'
import { AdminUiFooter } from './admin-ui-footer'
import { AdminUiHeader } from './admin-ui-header'
import { AdminUiLink } from './admin-ui-header-link'

export function AdminUiLayout({
  children,
  copyright,
  name,
  links,
}: PropsWithChildren<{
  copyright: ReactNode
  name: string
  links: AdminUiLink[]
}>) {
  return (
    <Flex direction="column" h="full">
      <AdminUiHeader links={links} name={name} />
      <Flex direction="column" grow={1} p={4}>
        <Container maxW="container.xl" h="full">
          {children}
        </Container>
      </Flex>
      <AdminUiFooter copyright={copyright} />
    </Flex>
  )
}
