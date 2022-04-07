import { ChakraProvider } from '@chakra-ui/react'
import { AdminShellFeature } from '@mogami/admin/shell/feature'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AdminShellFeature />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
