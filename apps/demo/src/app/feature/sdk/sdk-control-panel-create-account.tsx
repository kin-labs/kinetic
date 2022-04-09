import { Keypair } from '@mogami/keypair'
import { Sdk } from '@mogami/sdk'
import React, { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { KeypairEntity } from '../../data-access/keypair'
import { UiAlert } from '../../ui/ui-alert/ui-alert'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelCreateAccount({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)

  if (!keypair.mnemonic) {
    return <UiAlert message="Mnemonic not found on KeypairEntity" />
  }

  const kp: Keypair = Keypair.fromMnemonicSet(keypair.mnemonic)[0]

  const getResult = () => {
    sdk.createAccount(kp).then((res) => {
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
