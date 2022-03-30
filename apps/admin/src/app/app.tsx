import { Redirect, Route, Switch } from 'react-router-dom'
import { AboutIndex, HomeIndex } from './feature'
import { Layout, LayoutLink } from './ui/layout/layout'

export function App() {
  const links: LayoutLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
  ]
  return (
    <Layout links={links}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/about" component={AboutIndex} />
        <Route path="/home" component={HomeIndex} />
      </Switch>
    </Layout>
  )
}

export default App
