import { Sdk } from '@mogami/sdk'
import React, { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelServerConfig({ sdk }: { sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const getResult = () => {
    sdk.config().then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-server-config-btn" onClick={getResult}>
          Get Server Config
        </Button>
      </Stack>
      <SdkControlPanelResult cyData="panel-get-server-config" data={result} />
    </Stack>
  )
}
