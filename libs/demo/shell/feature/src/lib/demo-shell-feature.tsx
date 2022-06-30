import { AdminUiLayout, AdminUiLink } from '@kin-kinetic/admin/ui/layout'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const DemoHomeFeature = React.lazy(async () => import('@kin-kinetic/demo/home/feature'))
const DemoKeypairFeature = React.lazy(async () => import('@kin-kinetic/demo/keypair/feature'))
const DemoSdkFeature = React.lazy(async () => import('@kin-kinetic/demo/sdk/feature'))
const DemoServerFeature = React.lazy(async () => import('@kin-kinetic/demo/server/feature'))

export function DemoShellFeature() {
  const links: AdminUiLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'Keypair', path: '/keypair' },
    { label: 'SDK', path: '/sdk' },
    { label: 'Servers', path: '/servers' },
  ]
  return (
    <AdminUiLayout
      links={links}
      logo={'/assets/kin-logo.svg'}
      copyright={<div>Kin Foundation &copy; 2022</div>}
      name={'Kinetic'}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<DemoHomeFeature />} />
        <Route path="/keypair" element={<DemoKeypairFeature />} />
        <Route path="/sdk" element={<DemoSdkFeature />} />
        <Route path="/servers" element={<DemoServerFeature />} />
      </Routes>
    </AdminUiLayout>
  )
}
