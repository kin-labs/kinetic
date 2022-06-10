import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { AdminAuthLogoutFn } from '@mogami/admin/auth/data-access'
import { User } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminUiHeaderProfileMenu({ logout, user }: { logout: AdminAuthLogoutFn; user: User }) {
  const defaultAvatar = 'https://avatars.githubusercontent.com/u/82999948?v=4'
  return (
    <Menu>
      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
        <Avatar bg="transparent" size={'sm'} src={user?.avatarUrl || defaultAvatar} />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar bg="transparent" size={'2xl'} src={user?.avatarUrl || defaultAvatar} />
        </Center>
        <br />
        <Center>
          <p>{user?.name}</p>
        </Center>
        <br />
        <MenuGroup title="System Administration">
          <MenuItem as={Link} to="/system/dashboard">
            System Dashboard
          </MenuItem>
          <MenuItem as={Link} to="/system/clusters">
            Manage Clusters
          </MenuItem>
          <MenuItem as={Link} to="/system/users">
            Manage Users
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}
