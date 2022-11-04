import { Box, chakra, Stack, useColorModeValue } from '@chakra-ui/react'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { Card } from '@saas-ui/react'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const WebAppUiSettingsLink = chakra(NavLink, {
  baseStyle: { p: { base: 2 } },
})

export function WebAppUiSettingsLayout({ children, links }: { children: ReactNode; links: WebUiLinks }) {
  const activeBg = useColorModeValue('primary.100', 'gray.900')
  const activeColor = useColorModeValue('primary.600', 'primary.400')
  const bg = useColorModeValue('gray.50', 'gray.800')
  const activeBorderLeftColor = useColorModeValue('primary.600', 'primary.400')
  const hoverBg = useColorModeValue('primary.100', 'gray.700')
  const hoverColor = useColorModeValue('primary.600', 'primary.200')

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 2, md: 6 }} h={'full'} m={4}>
      <Box width="100%" maxW={{ base: 'full', md: '220px' }} minW={{ base: 'full', md: '220px' }}>
        <Card border={0} width="100%" maxW={{ base: 'full', md: '220px' }} bg={bg}>
          <Box as="nav" p={1}>
            <Stack spacing={0}>
              {links.map(({ label, path }) => (
                <WebAppUiSettingsLink
                  key={path}
                  to={path}
                  borderLeft="4px"
                  borderLeftColor={bg}
                  _activeLink={{
                    borderLeftColor: activeBorderLeftColor,
                    color: activeColor,
                    bg: activeBg,
                  }}
                  _hover={{ color: hoverColor, bg: hoverBg }}
                >
                  {label}
                </WebAppUiSettingsLink>
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
      <Box width="100%">{children}</Box>
    </Stack>
  )
}
