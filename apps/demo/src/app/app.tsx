import { ChakraProvider } from '@chakra-ui/react'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { DemoShellFeature } from '@kin-kinetic/demo/shell/feature'
import { Suspense } from 'react'

export function App() {
  return (
    <ChakraProvider>
      <Suspense fallback={<AdminUiLoader />}>
        <DemoShellFeature />
      </Suspense>
    </ChakraProvider>
  )
}
