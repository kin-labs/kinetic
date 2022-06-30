import { ChakraProvider } from '@chakra-ui/react'
import { AdminShellFeature } from '@kin-kinetic/admin/shell/feature'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { Suspense } from 'react'

export function App() {
  return (
    <ChakraProvider>
      <Suspense fallback={<AdminUiLoader />}>
        <AdminShellFeature />
      </Suspense>
    </ChakraProvider>
  )
}

export default App
