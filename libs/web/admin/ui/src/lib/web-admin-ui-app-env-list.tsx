import { AppEnv } from '@kin-kinetic/web/util/admin-sdk'
import { List } from '@saas-ui/react'
import { WebAdminUiAppEnvListItem } from './web-admin-ui-app-env-list-item'

export function WebAdminUiAppEnvList({
  appEnvs,
  deleteAppEnv,
}: {
  appEnvs: AppEnv[]
  deleteAppEnv: (env: AppEnv) => void
}) {
  return (
    <List>
      {appEnvs?.map((appEnv) => (
        <WebAdminUiAppEnvListItem key={appEnv?.id} appEnv={appEnv} deleteAppEnv={deleteAppEnv} />
      ))}
    </List>
  )
}
