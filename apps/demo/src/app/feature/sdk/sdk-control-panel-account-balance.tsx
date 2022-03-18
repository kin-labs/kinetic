import { Sdk } from '@mogami/sdk'
import React, { useState } from 'react'
import { Button, Input } from 'react-daisyui'
import { KeypairEntity } from '../../data-access/keypair'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAccountBalance({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [value, setValue] = useState<string>(keypair.publicKey)
  const getResult = () => {
    sdk.account.balance(value).then((res) => setResult(res.data))
  }
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-2 items-center">
        <Button onClick={getResult}>Get Account Balance</Button>
        <Input
          className="w-full"
          bordered
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          placeholder="Enter the accountId (Public Key for the Account owner)"
        />
      </div>
      <SdkControlPanelResult data={result} />
    </div>
  )
}
