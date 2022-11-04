import { Heading, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { Link } from 'react-router-dom'

export function WebAdminUiDashboard({ links, title }: { links: WebUiLinks; title: string }) {
  const bg = useColorModeValue('gray.100', 'gray.800')
  return (
    <WebUiPage title={title}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 2, lg: 6 }}>
        {links
          .filter((item) => !item.path?.includes('dashboard'))
          .map(({ path, label }) => (
            <Stack
              borderRadius="lg"
              p={{ base: 6, lg: 12 }}
              bg={bg}
              key={path}
              as={Link}
              to={path}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={6}
            >
              <Heading size={{ base: 'base', md: 'md', lg: 'lg' }}>{label}</Heading>
            </Stack>
          ))}
      </SimpleGrid>
    </WebUiPage>
  )
}
