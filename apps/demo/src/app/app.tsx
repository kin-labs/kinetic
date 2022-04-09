import { ChakraProvider } from '@chakra-ui/react'
import { AdminUiLayout, AdminUiLink } from '@mogami/admin/ui/layout'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { HomeIndex, KeypairIndex, SdkIndex } from './feature'
import { ServerIndex } from './feature/server/server-index'

export function App() {
  const links: AdminUiLink[] = [
    { label: 'Home', path: '/home', cyData: 'cy-nav-btn-home' },
    { label: 'Keypair', path: '/keypair', cyData: 'cy-nav-btn-keypair' },
    { label: 'SDK', path: '/sdk', cyData: 'cy-nav-btn-sdk' },
    { label: 'Servers', path: '/servers', cyData: 'cy-nav-btn-servers' },
  ]
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AdminUiLayout links={links} copyright={<div>Kin Foundation &copy; 2022</div>} name={'Mogami'}>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomeIndex} />
          <Route path="/keypair" component={KeypairIndex} />
          <Route path="/sdk" component={SdkIndex} />
          <Route path="/servers" component={ServerIndex} />
        </AdminUiLayout>
      </ChakraProvider>
    </BrowserRouter>
  )
}
