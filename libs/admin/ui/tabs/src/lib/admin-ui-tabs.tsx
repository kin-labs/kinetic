import { Box, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'

export interface AdminUiTabsProps {
  tabs: { path: string; label: string }[]
}

export function AdminUiTabs({ children, tabs }: PropsWithChildren<AdminUiTabsProps>) {
  const { pathname } = useLocation()
  const defaultIndex = tabs.findIndex((item) => pathname.startsWith(item.path)) || 0
  return (
    <Stack direction="column" spacing={6}>
      <Tabs colorScheme="teal" defaultIndex={defaultIndex}>
        <TabList>
          {tabs.map((tab) => (
            <Tab as={Link} key={tab.path} to={tab.path}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Box>{children}</Box>
    </Stack>
  )
}
