import { Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AdminUiLink } from '@mogami/admin/ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminSystemUiDashboard({ links }: { links: AdminUiLink[] }) {
  return (
    <SimpleGrid columns={2} gap={6}>
      {links?.map((link) => (
        <Stack spacing={6} borderWidth="1px" borderRadius="lg" key={link.path} p={6} justifyContent={'center'}>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to={link.path}>
              <Text fontSize="3xl" color="teal.500">
                {link.label}
              </Text>
            </Link>
          </Flex>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
