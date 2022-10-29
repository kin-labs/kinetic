import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { App } from '@kin-kinetic/web/util/admin-sdk'
import { ReactNode } from 'react'
import { MdAdd, MdOutlineDns } from 'react-icons/md'
import { TbChevronDown } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { WebAppUiEnvDropdownItem } from './web-app-ui-env-dropdown-item'

export interface WebAppUiEnvDropdownProps {
  app: App
  title: ReactNode
  colorScheme?: ThemeTypings['colorSchemes']
}

export function WebAppUiEnvDropdown({ app, colorScheme, title }: WebAppUiEnvDropdownProps) {
  return (
    <Menu autoSelect={false}>
      <MenuButton variant="outline" as={Button} colorScheme={colorScheme} rightIcon={<TbChevronDown />}>
        {title}
      </MenuButton>
      <MenuList>
        <Stack alignItems="center" direction="row" mb={2} px={3} py={1} spacing={2} w="full">
          <Text color={'gray.500'}>
            <MdOutlineDns />
          </Text>
          <Text>Environment</Text>
        </Stack>

        <MenuDivider />
        {app?.envs?.map((env) => (
          <WebAppUiEnvDropdownItem link={`/apps/${app.id}/environments`} env={env} key={env.id} />
        ))}
        <MenuDivider />
        <MenuItem alignItems="center" as={Link} to={`/apps/${app.id}/environments/create`}>
          <MdAdd />
          <Text ml={1} pt={0.5}>
            Create Environment
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
