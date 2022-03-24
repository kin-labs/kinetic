import { Redirect, Route } from 'react-router-dom'
import { HomeIndex, KeypairIndex, SdkIndex } from './feature'
import { ServerIndex } from './feature/server/server-index'
import { Layout, LayoutLink } from './ui/layout/layout'

export function App() {
  const links: LayoutLink[] = [
    { label: 'Home', path: '/home', cyData: 'cy-nav-btn-home' },
    { label: 'Keypair', path: '/keypair', cyData: 'cy-nav-btn-keypair' },
    { label: 'SDK', path: '/sdk', cyData: 'cy-nav-btn-sdk' },
    { label: 'Servers', path: '/servers', cyData: 'cy-nav-btn-servers' },
  ]
  return (
    <Layout links={links}>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={HomeIndex} />
      <Route path="/keypair" component={KeypairIndex} />
      <Route path="/sdk" component={SdkIndex} />
      <Route path="/servers" component={ServerIndex} />
    </Layout>
  )
}
