import { AdminUiLink } from '@mogami/admin/ui/layout'

export const name = 'Mogami Admin'
export const copyright = <p>Kin Foundation &copy; 2022</p>
export const links: AdminUiLink[] = [
  { label: 'Apps', path: '/apps' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Users', path: '/users' },
]
