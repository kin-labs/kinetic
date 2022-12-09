import { Heading, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminQueuesQuery } from '@kin-kinetic/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function WebAdminFeatureQueueList() {
  const [{ data, fetching }] = useAdminQueuesQuery()
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <WebUiPage title="Queues">
      {fetching ? (
        <WebUiLoader />
      ) : (
        <Stack>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 2, lg: 6 }}>
            {data?.items?.map(({ count, name, type }) => (
              <Stack
                borderRadius="lg"
                p={{ base: 6, lg: 12 }}
                bg={bg}
                key={name}
                alignItems="center"
                justifyContent="center"
                spacing={6}
              >
                <Heading as={Link} to={type} size={{ base: 'base', md: 'md', lg: 'lg' }}>
                  {name}
                </Heading>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </WebUiPage>
  )
}
