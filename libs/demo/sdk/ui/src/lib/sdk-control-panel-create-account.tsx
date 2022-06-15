import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { MogamiSdk } from '@kin-kinetic/sdk'
import React, { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'

import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelCreateAccount({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: MogamiSdk }) {
  const [result, setResult] = useState<unknown>(null)

  if (!keypair.secretKey) {
    return <AdminUiAlert message="Invalid keypair found in DemoKeypairEntity" />
  }

  const kp: Keypair = Keypair.fromSecretKey(keypair.secretKey)

  const getResult = () => {
    sdk.createAccount({ owner: kp }).then((res) => {
      setResult(res)
    })
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="create-account-btn" onClick={getResult}>
          Create Account
        </Button>
      </Stack>
      <SdkControlPanelResult cyData="panel-create-account" data={result} />
    </Stack>
  )
}
