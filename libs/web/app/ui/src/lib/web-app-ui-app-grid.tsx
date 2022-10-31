import { SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { App } from '@kin-kinetic/web/util/sdk'
import { WebAppUiAppGridItem } from './web-app-ui-app-grid-item'

export function WebAppUiAppGrid({ apps }: { apps: App[] }) {
  const bg = useColorModeValue('gray.100', 'gray.700')
  if (!apps.length) {
    return <WebUiAlert message={'No apps Found'} />
  }
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: 2, md: 4, xl: 6 }}>
      {apps.map((app) => (
        <Stack bg={bg} borderRadius="lg" borderWidth="1px" key={app.id}>
          <WebAppUiAppGridItem app={app} />
        </Stack>
      ))}
    </SimpleGrid>
  )
}
