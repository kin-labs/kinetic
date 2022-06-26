import { KineticSdk } from '@kin-kinetic/sdk'
import React, { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAppConfig({ sdk }: { sdk: KineticSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const getResult = async () => {
    setResult(sdk.config)
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-app-config-btn" onClick={getResult}>
          Get App Config
        </Button>
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
