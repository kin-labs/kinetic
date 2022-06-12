import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react'
import { AdminUiLink } from '@mogami/admin/ui/layout'
import React, { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

export function AdminSystemUiLayout({ children, links }: PropsWithChildren<{ links: AdminUiLink[] }>) {
  return (
    <Grid templateAreas={`"nav main"`} gridTemplateRows={'1fr'} gridTemplateColumns={'250px 1fr'} gap="6">
      <GridItem area={'nav'}>
        <Stack className="sidebar" spacing={4} justifyContent={'center'}>
          {links?.map((link) => (
            <Flex
              key={link.path}
              as={NavLink}
              to={link.path}
              justifyContent="space-between"
              alignItems="center"
              borderWidth="1px"
              borderRadius="lg"
              px={5}
              py={4}
            >
              {link.label}
            </Flex>
          ))}
        </Stack>
      </GridItem>
      <GridItem area={'main'}>{children}</GridItem>
    </Grid>
  )
}
