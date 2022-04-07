import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AdminUiHeaderLink, AdminUiLink } from './admin-ui-header-link'

export function AdminUiHeader({ links, name }: { links: AdminUiLink[]; name: string }) {
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
          <Stack direction={'row'} spacing={7}>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar bg="transparent" size={'sm'} src={'https://avatars.githubusercontent.com/u/82999948?v=4'} />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar bg="transparent" size={'2xl'} src={'https://avatars.githubusercontent.com/u/82999948?v=4'} />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
