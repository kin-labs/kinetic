import { Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { App } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiGridProps {
  apps: Partial<App>[] | null | undefined
}

export function AdminAppUiGrid({ apps }: AdminAppUiGridProps) {
  return (
    <SimpleGrid columns={2} gap={6}>
      {apps?.map((app) => (
        <Stack spacing={6} borderWidth="1px" borderRadius="lg" key={app.id} p={6} justifyContent={'center'}>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to={'/apps/' + app.id}>
              <Text fontSize="3xl" color="teal.500">
                {app.name}
              </Text>
            </Link>
            <Text fontSize="2xl">{app.index}</Text>
          </Flex>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
