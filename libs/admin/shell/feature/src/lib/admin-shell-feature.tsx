import { AdminHomeFeature } from '@mogami/admin/home/feature'
import { AdminUiLayout, AdminUiLayoutLink } from '@mogami/admin/ui/layout'
import { createGraphqlClient } from '@mogami/shared/util/admin-sdk'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'urql'

const client = createGraphqlClient()

export function AdminShellFeature() {
  const links: AdminUiLayoutLink[] = [
    // Top Links
    { label: 'Home', path: '/home' },
  ]
  return (
    <Provider value={client}>
      <AdminUiLayout links={links}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={AdminHomeFeature} />
        </Switch>
      </AdminUiLayout>
    </Provider>
  )
}
