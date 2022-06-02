import { Box, Button, Code, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { App } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminAppUiGridProps {
  apps: Partial<App>[] | null | undefined
  deleteApp: (appId: string) => void
}

export function AdminAppUiGrid({ apps, deleteApp }: AdminAppUiGridProps) {
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
          <Box>
            {app.id && (
              <Button variant="ghost" color="red.500" size="xs" onClick={() => deleteApp(app.id!)}>
                Delete
              </Button>
            )}
          </Box>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
