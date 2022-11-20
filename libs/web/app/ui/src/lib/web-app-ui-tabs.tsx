import { Box, Button, ButtonGroup, chakra, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { App, AppEnv } from '@kin-kinetic/web/util/sdk'
import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { WebAppUiEnvDropdown } from './web-app-ui-env-dropdown'

const WebAppUiTabLink = chakra(NavLink, {
  baseStyle: {
    p: { base: 2, md: 4 },
    rounded: 'md',
    _hover: { bg: 'primary.50', color: 'primary.500' },
  },
})

export function WebAppUiTabs({
  app,
  environment,
  children,
  tabs,
}: PropsWithChildren<{
  app: App
  environment: AppEnv
  tabs: WebUiLinks
}>) {
  const activeBg = useColorModeValue('primary.100', 'primary.800')
  const activeColor = useColorModeValue('primary.600', 'primary.100')
  const borderColor = useColorModeValue('gray.300', 'gray.700')
  const hoverBg = useColorModeValue('primary.200', 'primary.900')
  const hoverColor = useColorModeValue('primary.600', 'primary.200')

  return (
    <Box h={'100%'}>
      <Box px={4} borderBottom={'1px'} borderBottomColor={borderColor}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Flex justifyContent="space-between" alignItems="top" w={'full'}>
            <ButtonGroup variant="default" py={4}>
              {tabs.map((tab) => (
                <Button
                  as={WebAppUiTabLink}
                  to={tab.path}
                  key={tab.path}
                  _activeLink={{ bg: activeBg, color: activeColor }}
                  _hover={{ bg: hoverBg, color: hoverColor }}
                >
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>

            <Stack direction="row" alignItems="center" py={4}>
              <Text fontSize="lg" fontWeight="bold" mr={4}>
                Environment
              </Text>
              <WebAppUiEnvDropdown app={app} title={environment.name} colorScheme="primary" />
            </Stack>
          </Flex>
        </Stack>
      </Box>
      {children}
    </Box>
  )
}
