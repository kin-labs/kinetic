import { Box, Button, ButtonGroup, chakra, useColorModeValue } from '@chakra-ui/react'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { Divider } from '@saas-ui/react'
import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

const WebAdminUiLayoutNavLink = chakra(NavLink, {
  baseStyle: {
    p: { base: 2, md: 4 },
    rounded: 'md',
    _hover: { bg: 'primary.50', color: 'primary.500' },
  },
})

export function WebAdminUiTabs({ children, tabs }: PropsWithChildren<{ tabs: WebUiLinks }>) {
  const activeBg = useColorModeValue('primary.100', 'primary.800')
  const activeColor = useColorModeValue('primary.600', 'primary.100')
  const dividerColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('primary.200', 'primary.900')
  const hoverColor = useColorModeValue('primary.600', 'primary.200')

  return (
    <WebUiCard p="0">
      <Box p={2}>
        <ButtonGroup variant="default">
          {tabs.map((tab) => (
            <Button
              as={WebAdminUiLayoutNavLink}
              to={tab.path}
              key={tab.path}
              _activeLink={{ bg: activeBg, color: activeColor }}
              _hover={{ bg: hoverBg, color: hoverColor }}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Divider py={1} borderColor={dividerColor} />
      {children}
    </WebUiCard>
  )
}
