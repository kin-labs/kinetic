import { createGraphqlClient } from '@mogami/shared/util/admin-sdk'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'urql'
import { AboutIndex, HomeIndex } from './feature'
import { Layout, LayoutLink } from './ui/layout/layout'

const client = createGraphqlClient()

export function App() {
  const links: LayoutLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
  ]
  return (
    <Provider value={client}>
      <Layout links={links}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/about" component={AboutIndex} />
          <Route path="/home" component={HomeIndex} />
        </Switch>
      </Layout>
    </Provider>
  )
}

export default App
