import { AdminUiLayout, AdminUiLink } from '@mogami/admin/ui/layout'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const DemoHomeFeature = React.lazy(async () => import('@mogami/demo/home/feature'))
const DemoKeypairFeature = React.lazy(async () => import('@mogami/demo/keypair/feature'))
const DemoSdkFeature = React.lazy(async () => import('@mogami/demo/sdk/feature'))
const DemoServerFeature = React.lazy(async () => import('@mogami/demo/server/feature'))

export function DemoShellFeature() {
  const links: AdminUiLink[] = [
    { label: 'Home', path: '/home', cyData: 'cy-nav-btn-home' },
    { label: 'Keypair', path: '/keypair', cyData: 'cy-nav-btn-keypair' },
    { label: 'SDK', path: '/sdk', cyData: 'cy-nav-btn-sdk' },
    { label: 'Servers', path: '/servers', cyData: 'cy-nav-btn-servers' },
  ]
  return (
    <AdminUiLayout links={links} copyright={<div>Kin Foundation &copy; 2022</div>} name={'Mogami'}>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" render={() => <DemoHomeFeature />} />
      <Route path="/keypair" render={() => <DemoKeypairFeature />} />
      <Route path="/sdk" render={() => <DemoSdkFeature />} />
      <Route path="/servers" render={() => <DemoServerFeature />} />
    </AdminUiLayout>
  )
}
