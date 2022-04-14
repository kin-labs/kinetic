import { ChakraProvider } from '@chakra-ui/react'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { DemoShellFeature } from '@mogami/demo/shell/feature'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Suspense fallback={<AdminUiLoader />}>
          <DemoShellFeature />
        </Suspense>
      </ChakraProvider>
    </BrowserRouter>
  )
}
