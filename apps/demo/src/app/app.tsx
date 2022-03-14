import { Redirect, Route } from 'react-router-dom'
import { HomeIndex, KeypairIndex, SdkIndex } from './feature'
import { Layout, LayoutLink } from './ui/layout/layout'

export function App() {
  const links: LayoutLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'Keypair', path: '/keypair' },
    { label: 'SDK', path: '/sdk' },
  ]
  return (
    <Layout links={links}>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={HomeIndex} />
      <Route path="/keypair" component={KeypairIndex} />
      <Route path="/sdk" component={SdkIndex} />
    </Layout>
  )
}
