import { MogamiSdk } from '@mogami/sdk'
import React, { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAppConfig({ sdk }: { sdk: MogamiSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const getResult = () => {
    setResult(sdk.config())
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-app-config-btn" onClick={getResult}>
          Get App Config
        </Button>
      </Stack>
      <SdkControlPanelResult cyData="panel-get-app-config" data={result} />
    </Stack>
  )
}
