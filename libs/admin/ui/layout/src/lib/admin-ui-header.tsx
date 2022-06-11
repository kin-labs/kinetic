import { Box, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react'
import { AdminAuthLogoutFn } from '@mogami/admin/auth/data-access'
import { User } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AdminUiHeaderLink, AdminUiLink } from './admin-ui-header-link'
import { AdminUiHeaderProfileMenu } from './admin-ui-header-profile-menu'
import { AdminUiThemeToggle } from './admin-ui-theme-toggle'

export function AdminUiHeader({
  links,
  logout,
  name,
  user,
}: {
  links: AdminUiLink[]
  logout?: AdminAuthLogoutFn
  name: string
  user?: User
}) {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box px={4}>
              <Heading size="md">
                <RouterLink to="/">{name}</RouterLink>
              </Heading>
            </Box>
            {links?.map((link) => (
              <AdminUiHeaderLink key={link.path} link={link} />
            ))}
          </Stack>
        </Flex>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={4}>
            <AdminUiThemeToggle />
            {user && logout && <AdminUiHeaderProfileMenu logout={logout} user={user} />}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
