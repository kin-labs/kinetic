import { Sdk } from '@mogami/sdk'
import React, { useState } from 'react'
import { Button, Input } from 'react-daisyui'
import { KeypairEntity } from '../../data-access/keypair'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelRequestAirdrop({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [amount, setAmount] = useState<string>('1')
  const getResult = () => {
    sdk.airdrop.request({ account: keypair.publicKey, amount }).then((res) => setResult(res.data))
  }
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-2 items-center">
        <Button onClick={getResult}>Request Airdrop</Button>
        <Input
          className="w-full"
          bordered
          type="number"
          value={amount}
          onChange={(ev) => setAmount(ev.target.value)}
          placeholder="Enter the amount (Max: 50000)"
        />
      </div>
      <SdkControlPanelResult data={result} />
    </div>
  )
}
