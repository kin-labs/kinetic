import { ChakraProvider, Text } from '@chakra-ui/react'
import { DemoShellFeature } from '@kin-kinetic/demo/shell/feature'
import { Suspense } from 'react'

export function App() {
  return (
    <ChakraProvider>
      <Suspense fallback={<Text>Loading...</Text>}>
        <DemoShellFeature />
      </Suspense>
    </ChakraProvider>
  )
}
