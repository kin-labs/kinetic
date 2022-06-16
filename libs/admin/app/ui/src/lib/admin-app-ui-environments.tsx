import { Alert, Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AppEnv } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiEnvironmentsProps {
  appId: string
  environments: AppEnv[] | null | undefined
}

export function AdminAppUiEnvironments({ appId, environments }: AdminAppUiEnvironmentsProps) {
  if (!environments?.length) {
    return <Alert>No environments found.</Alert>
  }
  return (
    <SimpleGrid columns={2} gap={6}>
      {environments?.map((environment) => (
        <Stack spacing={6} borderWidth="1px" borderRadius="lg" key={environment.id} p={6} justifyContent={'center'}>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to={`/apps/${appId}/environments/${environment.id}`}>
              <Text fontSize="3xl" color="teal.500">
                {environment.name}
              </Text>
            </Link>
            <Text fontSize="2xl">{environment?.cluster?.name}</Text>
          </Flex>
          <Box>Mints: {environment.mints?.map((mint) => mint?.mint?.symbol)?.join(', ')}</Box>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
