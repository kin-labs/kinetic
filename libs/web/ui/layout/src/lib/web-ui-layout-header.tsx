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
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useWebAuth } from '@kin-kinetic/web/auth/data-access'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import { WebUiLayoutHeaderApps } from './web-ui-layout-header-apps'
import { WebUiLayoutThemeToggle } from './web-ui-layout-theme-toggle'

export function WebUiLayoutHeader() {
  const { logout, user } = useWebAuth()
  const borderColor = useColorModeValue('gray.300', 'gray.700')
  return (
    <Box px={4} borderBottom={'1px'} borderColor={borderColor}>
      <Stack h={16} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction="row" w="full" alignItems={'center'} spacing={4}>
          <RouterLink replace to="/">
            <Stack direction="row" alignItems={'center'} spacing={4}>
              <Avatar src={'/assets/kin-logo.svg'} bg="inherit" size="sm" />
              <Text fontSize="lg" fontWeight="semibold" className="cy-header">
                Kinetic Manager
              </Text>
            </Stack>
          </RouterLink>
          {user ? <WebUiLayoutHeaderApps /> : null}
        </Stack>
        <Flex w="full" alignItems="center" justifyContent="end">
          <Stack direction={'row'} spacing={4}>
            <WebUiLayoutThemeToggle />
            {user && (
              <Menu autoSelect={false}>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" size="lg" minW={0}>
                  <Avatar size="sm" src={user?.avatarUrl || ''} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar size={'2xl'} src={user?.avatarUrl || ''} />
                  </Center>
                  <br />
                  <Center>
                    <Stack alignItems="center">
                      <Heading size="md">{user?.username}</Heading>
                      <Tag size="sm">{user?.role}</Tag>
                    </Stack>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem as={NavLink} to={'/apps'}>
                    Your Apps
                  </MenuItem>
                  {user?.role === 'Admin' && (
                    <>
                      <MenuDivider />
                      <MenuGroup title="Admin">
                        <MenuItem as={NavLink} to={'/admin'}>
                          Admin Dashboard
                        </MenuItem>
                        <MenuItem as={NavLink} to={'/admin/apps'}>
                          Apps
                        </MenuItem>
                        <MenuItem as={NavLink} to={'/admin/clusters'}>
                          Clusters
                        </MenuItem>
                        <MenuItem as={NavLink} to={'/admin/queues'}>
                          Queues
                        </MenuItem>
                        <MenuItem as={NavLink} to={'/admin/users'}>
                          Users
                        </MenuItem>
                        <MenuItem as={NavLink} to={'/admin/wallets'}>
                          Wallets
                        </MenuItem>
                      </MenuGroup>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem as={Button} variant="ghost" onClick={logout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Flex>
      </Stack>
    </Box>
  )
}
