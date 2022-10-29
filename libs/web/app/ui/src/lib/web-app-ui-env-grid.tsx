import { Heading, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { App } from '@kin-kinetic/web/util/admin-sdk'
import { Link } from 'react-router-dom'

export function WebAppUiEnvGrid({ app }: { app: App }) {
  const bg = useColorModeValue('gray.100', 'gray.900')
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 2, md: 6, lg: 12 }}>
      {app?.envs?.map((env) => (
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          p={{ base: 6, lg: 12 }}
          bg={bg}
          key={env.id}
          as={Link}
          to={`/apps/${app.id}/environments/${env.id}`}
          alignItems="center"
          justifyContent="center"
          spacing={6}
        >
          <Heading size="md">{env.name}</Heading>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
