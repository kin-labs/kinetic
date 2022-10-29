import { Button, Stack, useToast } from '@chakra-ui/react'
import { WebAppUiAppEnvList } from '@kin-kinetic/web/app/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { App, AppEnv, useUserDeleteAppEnvMutation } from '@kin-kinetic/web/util/sdk'
import { CardHeader, CardTitle } from '@saas-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export function WebAppSettingsEnvironmentsTab({ app }: { app: App }) {
  const toast = useToast()
  const [, deleteAppEnvMutation] = useUserDeleteAppEnvMutation()
  const deleteAppEnv = (appEnv: AppEnv) => {
    if (!window.confirm('Are you sure?')) return
    deleteAppEnvMutation({ appId: app.id, appEnvId: appEnv.id })
      .then((res) => {
        toast({ status: 'success', title: `Environment Deleted` })
      })
      .catch((error) => {
        console.log('Something went wrong', error)
      })
  }
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebUiCard>
        <CardHeader>
          <CardTitle fontSize="xl" mr={'2'}>
            Environments
          </CardTitle>
          <Button as={Link} to={`/apps/${app.id}/environments/create`}>
            Create Environment
          </Button>
        </CardHeader>
      </WebUiCard>
      <WebUiCard p={0}>
        <Stack>
          <WebAppUiAppEnvList appEnvs={app.envs || []} deleteAppEnv={deleteAppEnv} />
        </Stack>
      </WebUiCard>
    </Stack>
  )
}
