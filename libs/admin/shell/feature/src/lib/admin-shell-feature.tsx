import { AdminHomeFeature } from '@mogami/admin/home/feature'
import { AdminUiLayout, AdminUiLink } from '@mogami/admin/ui/layout'
import { createGraphqlClient } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'urql'

const client = createGraphqlClient()

export function AdminShellFeature() {
  const name = 'Mogami Admin'
  const copyright = <p>Kin Foundation &copy; 2022</p>
  const links: AdminUiLink[] = [{ label: 'Home', path: '/home' }]
  return (
    <Provider value={client}>
      <AdminUiLayout copyright={copyright} name={name} links={links}>
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
