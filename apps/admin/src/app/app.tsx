import { ChakraProvider } from '@chakra-ui/react'
import { AdminShellFeature } from '@mogami/admin/shell/feature'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
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
