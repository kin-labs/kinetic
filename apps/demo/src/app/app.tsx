import { Redirect, Route } from 'react-router-dom'
import { HomeIndex, KeypairIndex, SdkIndex } from './feature'
import { ServerIndex } from './feature/server/server-index'
import { Layout, LayoutLink } from './ui/layout/layout'

export function App() {
  const links: LayoutLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'Keypair', path: '/keypair' },
    { label: 'SDK', path: '/sdk' },
    { label: 'Servers', path: '/servers' },
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
