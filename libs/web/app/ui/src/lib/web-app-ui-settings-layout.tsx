import { Box, Stack } from '@chakra-ui/react'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { AppShell } from '@saas-ui/app-shell'
import { NavGroup, NavItem, Sidebar, SidebarSection } from '@saas-ui/sidebar'
import { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export function WebAppUiSettingsLayout({
  children,
  links,
  title,
}: {
  children: ReactNode
  links: WebUiLinks
  title: string
}) {
  const location = useLocation()

  return (
    <AppShell
      variant={'static'}
      position={'relative'}
      height={'100%'}
      width={'100%'}
      sidebar={
        <Sidebar>
          <SidebarSection aria-label="Main">
            <NavGroup title={title}>
              {links.map(({ icon, label, path }) => (
                <NavItem as={NavLink} to={path} key={path} icon={icon} isActive={location.pathname.startsWith(path)}>
                  {label}
                </NavItem>
              ))}
            </NavGroup>
          </SidebarSection>
        </Sidebar>
      }
    >
      <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 2, md: 6 }} h={'100%'} m={0} overflow={'auto'}>
        <Box w="100%">{children}</Box>
      </Stack>
    </AppShell>
  )
}
