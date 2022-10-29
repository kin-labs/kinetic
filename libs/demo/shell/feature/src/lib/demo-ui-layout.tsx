import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

import React, { PropsWithChildren, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export function DemoUiLayout({
  children,
  copyright,
  name,
  links = [],
  logo,
}: PropsWithChildren<{
  copyright: ReactNode
  name: string
  links?: DemoUiLink[]
  logo: string
}>) {
  return (
    <Flex direction="column" h="full">
      <DemoUiHeader name={name} links={links} logo={logo} />
      <Flex direction="column" grow={1} p={4}>
        <Container maxW="container.xl" h="full">
          {children}
        </Container>
      </Flex>
      <DemoUiFooter copyright={copyright} />
    </Flex>
  )
}

export function DemoUiFooter({ copyright }: { copyright: ReactNode }) {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.600', 'gray.500')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} />
        <Flex alignItems={'center'}>
          <Box>{copyright}</Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export function DemoUiHeader({ links, logo, name }: { links: DemoUiLink[]; logo: string; name: string }) {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box px={4}>
              <Flex alignItems={'center'}>
                <Image src={logo} h={8} mr={4} />
                <Heading size="md">
                  <RouterLink to="/">{name}</RouterLink>
                </Heading>
              </Flex>
            </Box>
            {links?.map((link) => (
              <DemoUiHeaderLink key={link.path} link={link} />
            ))}
          </Stack>
        </Flex>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={4}>
            <DemoUiThemeToggle />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

export interface DemoUiLink {
  label: string
  path: string
}

export function DemoUiHeaderLink({ link }: { link: DemoUiLink }) {
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      as={RouterLink}
      to={link.path}
    >
      {link.label}
    </Link>
  )
}

export function DemoUiThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button variant="ghost" onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
