import { Stack } from '@chakra-ui/react'
import { Sdk } from '@mogami/sdk'
import React from 'react'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAppConfig({ sdk }: { sdk: Sdk }) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        App Config
      </Stack>
      <SdkControlPanelResult cyData="panel-get-server-config" data={sdk.appConfig} />
    </Stack>
  )
}
