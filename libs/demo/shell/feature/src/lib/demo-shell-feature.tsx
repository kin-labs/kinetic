import { AdminUiLayout, AdminUiLink } from '@mogami/admin/ui/layout'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const DemoHomeFeature = React.lazy(async () => import('@mogami/demo/home/feature'))
const DemoKeypairFeature = React.lazy(async () => import('@mogami/demo/keypair/feature'))
const DemoSdkFeature = React.lazy(async () => import('@mogami/demo/sdk/feature'))
const DemoServerFeature = React.lazy(async () => import('@mogami/demo/server/feature'))

export function DemoShellFeature() {
  const links: AdminUiLink[] = [
    { label: 'Home', path: '/demo/home', cyData: 'cy-nav-btn-home' },
    { label: 'Keypair', path: '/demo/keypair', cyData: 'cy-nav-btn-keypair' },
    { label: 'SDK', path: '/demo/sdk', cyData: 'cy-nav-btn-sdk' },
    { label: 'Servers', path: '/demo/servers', cyData: 'cy-nav-btn-servers' },
  ]
  return (
    <AdminUiLayout links={links} copyright={<div>Kin Foundation &copy; 2022</div>} name={'Mogami'}>
      <Route path="/demo/" exact>
        <Redirect to="/demo/home" />
      </Route>
      <Route path="/demo/home" render={() => <DemoHomeFeature />} />
      <Route path="/demo/keypair" render={() => <DemoKeypairFeature />} />
      <Route path="/demo/sdk" render={() => <DemoSdkFeature />} />
      <Route path="/demo/servers" render={() => <DemoServerFeature />} />
    </AdminUiLayout>
  )
}
