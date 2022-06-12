import { Container, Flex } from '@chakra-ui/react'
import { AdminAuthLogoutFn } from '@mogami/admin/auth/data-access'
import { User } from '@mogami/shared/util/admin-sdk'
import React, { PropsWithChildren, ReactNode } from 'react'
import { AdminUiFooter } from './admin-ui-footer'
import { AdminUiHeader } from './admin-ui-header'
import { AdminUiLink } from './admin-ui-header-link'

export function AdminUiLayout({
  children,
  copyright,
  name,
  links = [],
  logo,
  logout,
  user,
}: PropsWithChildren<{
  copyright: ReactNode
  name: string
  links?: AdminUiLink[]
  logo: string
  logout?: AdminAuthLogoutFn
  user?: User
}>) {
  return (
    <Flex direction="column" h="full">
      <AdminUiHeader links={links} logo={logo} logout={logout} name={name} user={user} />
      <Flex direction="column" grow={1} p={4}>
        <Container maxW="container.xl" h="full">
          {children}
        </Container>
      </Flex>
      <AdminUiFooter copyright={copyright} />
    </Flex>
  )
}
