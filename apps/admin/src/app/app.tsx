import { ChakraProvider } from '@chakra-ui/react'
import { AdminShellFeature } from '@kin-kinetic/admin/shell/feature'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Suspense fallback={<AdminUiLoader />}>
          <AdminShellFeature />
        </Suspense>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
