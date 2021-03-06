import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { AdminAuthLogoutFn } from '@kin-kinetic/admin/auth/data-access'
import { User, UserRole } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminUiHeaderProfileMenu({ logout, user }: { logout: AdminAuthLogoutFn; user: User }) {
  const defaultAvatar = 'https://avatars.githubusercontent.com/u/82999948?v=4'
  const isAdmin = user.role === UserRole.Admin
  return (
    <Menu>
      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
        <Avatar size={'sm'} src={user?.avatarUrl || defaultAvatar} />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar size={'2xl'} src={user?.avatarUrl || defaultAvatar} />
        </Center>
        <br />
        <Center>
          <Stack spacing={2}>
            <Text fontSize="lg">{user?.name}</Text>
            <Text color="gray.500">{user?.role}</Text>
          </Stack>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem as={Link} to="/apps">
          Your Apps
        </MenuItem>
        {isAdmin ? (
          <>
            <MenuDivider />
            <MenuGroup title="System Administration">
              <MenuItem as={Link} to="/system/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem as={Link} to="/system/apps">
                Manage Apps
              </MenuItem>
              <MenuItem as={Link} to="/system/clusters">
                Manage Clusters
              </MenuItem>
              <MenuItem as={Link} to="/system/users">
                Manage Users
              </MenuItem>
              <MenuItem as={Link} to="/system/wallets">
                Manage Wallets
              </MenuItem>
            </MenuGroup>
          </>
        ) : null}
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}
