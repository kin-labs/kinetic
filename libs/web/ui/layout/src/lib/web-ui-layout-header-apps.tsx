import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { WebUiAppAvatar } from '@kin-kinetic/web/ui/app-avatar'
import { useWebAuth } from '@kin-kinetic/web/auth/data-access'
import { WebUiSettingsLink } from '@kin-kinetic/web/ui/link'
import { App } from '@kin-kinetic/web/util/sdk'
import { MdApps, MdOutlineDashboard } from 'react-icons/md'
import { Link, Link as RouterLink } from 'react-router-dom'
import { useWebUiLayout } from './web-ui-layout-provider'

export function WebUiLayoutHeaderApps() {
  const { app, apps } = useWebUiLayout()
  const { user } = useWebAuth()

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost" size="lg" px={2}>
        <Stack
          flexGrow={1}
          fontWeight={'bold'}
          direction="row"
          alignItems="center"
          as={RouterLink}
          to={`/apps/${app?.id}`}
          px={2}
          ml="-8px"
        >
          {app && <WebUiAppAvatar mr={1} logoUrl={app.logoUrl} size={'xs'} />}
          <Text fontSize="xl">{app ? app.name : 'Kinetic'}</Text>
        </Stack>
      </MenuButton>
      <MenuList>
        <Stack alignItems="center" direction="row" mb={2} px={3} py={1} spacing={2} w="full">
          <Text color={'gray.500'}>
            <MdApps size={24} color={''} />
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            My apps
          </Text>
        </Stack>
        <MenuDivider my={0} />
        {apps?.map((item) => (
          <MenuItem key={item.id} px={0} py={0} minWidth={350}>
            <WebLayoutUiAppItem app={item} selected={item.id === app?.id} />
          </MenuItem>
        ))}
        {user?.role === 'Admin' && (
          <>
            <MenuDivider my={0} />
            <MenuItem as={Link} to="/apps" mt={2}>
              <Stack alignItems="center" direction="row" justifyContent="center" py={0} spacing={2} w="full">
                <Text color={'gray.500'}>
                  <MdOutlineDashboard size={24} />
                </Text>
                <Text fontSize="lg" fontWeight="bold" pt={0.5}>
                  Dashboard
                </Text>
              </Stack>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}

export function WebLayoutUiAppItem({ app, selected }: { app: App | undefined; selected: boolean }) {
  const color = useColorModeValue('gray.900', 'gray.300')
  const selectedColorBgColor = useColorModeValue('gray.200', 'gray.600')
  const selectedColor = useColorModeValue('black', 'white')
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      px={2}
      py={2}
      bg={selected ? selectedColorBgColor : undefined}
    >
      <Stack
        flexGrow={1}
        fontWeight={selected ? 'bold' : 'normal'}
        color={selected ? selectedColor : color}
        direction="row"
        alignItems="center"
        spacing={4}
        as={RouterLink}
        to={`/apps/${app?.defaultEnvUrl}`}
        px={2}
        py={2}
        pr={8}
      >
        <WebUiAppAvatar logoUrl={app?.logoUrl} />
        <Stack alignItems="start" justifyContent="space-between" w="full" spacing={-0.5}>
          <Text fontWeight="semibold">{app?.name}</Text>
          <Text fontSize="xs">{`App index: ${app?.index}`}</Text>
        </Stack>
      </Stack>
      <WebUiSettingsLink label="App settings" to={`/apps/${app?.settingsUrl}`} />
    </Stack>
  )
}
