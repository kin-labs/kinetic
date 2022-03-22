import { Keypair } from '@mogami/keypair'
import { Sdk } from '@mogami/sdk'
import React, { useState } from 'react'
import { Button } from 'react-daisyui'
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
    sdk.account.create(kp).then((res) => {
      setResult(res)
    })
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-2 items-center">
        <Button onClick={getResult}>Create Account</Button>
      </div>
      <SdkControlPanelResult data={result} />
    </div>
  )
}
