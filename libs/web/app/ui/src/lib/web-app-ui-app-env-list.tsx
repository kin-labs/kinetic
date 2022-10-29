import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { AppEnv } from '@kin-kinetic/web/util/admin-sdk'
import { List } from '@saas-ui/react'
import React from 'react'
import { WebAppUiAppEnvListItem } from './web-app-ui-app-env-list-item'

export function WebAppUiAppEnvList({
  appEnvs,
  deleteAppEnv,
}: {
  appEnvs: AppEnv[]
  deleteAppEnv: (env: AppEnv) => void
}) {
  if (!appEnvs.length) {
    return <WebUiAlert message={'This app has no environments.'} />
  }
  return (
    <List>
      {appEnvs?.map((appEnv) => (
        <WebAppUiAppEnvListItem key={appEnv?.id} appEnv={appEnv} deleteAppEnv={deleteAppEnv} />
      ))}
    </List>
  )
}
