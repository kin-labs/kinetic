import { Button, Stack } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import React, { useState } from 'react'
import { MintSwitcher } from './mint-switcher'

import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelCreateAccount({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  const mints = sdk?.config()?.mints || []
  const [mint, setMint] = useState<AppConfigMint>(mints[0])
  const [result, setResult] = useState<unknown>(null)

  if (!keypair.secretKey) {
    return <AdminUiAlert message="Invalid keypair found in DemoKeypairEntity" />
  }

  const kp: Keypair = Keypair.fromSecretKey(keypair.secretKey)

  const getResult = () => {
    sdk.createAccount({ mint: mint.publicKey, owner: kp }).then((res) => {
      setResult(res)
    })
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="create-account-btn" onClick={getResult}>
          Create Account
        </Button>
        <MintSwitcher mint={mint} mints={mints} selectMint={setMint} />
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
