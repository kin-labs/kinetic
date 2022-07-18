import { Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AdminUiLink } from '@kin-kinetic/admin/ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminSystemUiDashboard({ links }: { links: AdminUiLink[] }) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
      {links?.map((link) => (
        <Stack spacing={6} borderWidth="1px" borderRadius="lg" key={link.path} justifyContent={'center'}>
          <Flex as={Link} to={link.path} justifyContent="space-between" alignItems="center" p={6}>
            <Text fontSize="3xl" color="teal.500">
              {link.label}
            </Text>
          </Flex>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
