import { AppUser } from '@kin-kinetic/web/util/sdk'
import { List } from '@saas-ui/react'
import { WebAdminUiAppUserListItem } from './web-admin-ui-app-user-list-item'

export function WebAdminUiAppUserList({ appUsers }: { appUsers: AppUser[] }) {
  return (
    <List>
      {appUsers?.map((appUser) => (
        <WebAdminUiAppUserListItem key={appUser?.id} appUser={appUser} />
      ))}
    </List>
  )
}
