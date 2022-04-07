import { Sdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from 'react-daisyui'
import { KeypairEntity } from '../../data-access/keypair'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelRequestAirdrop({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [amount, setAmount] = useState<string>('1')
  const getResult = () => {
    sdk.requestAirdrop(keypair.publicKey, amount).then((res) => setResult(res.data))
  }
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-2 items-center">
        <Button className="request-airdrop-btn" onClick={getResult}>
          Request Airdrop
        </Button>
        <Input
          className="w-full"
          bordered
          type="number"
          value={amount}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAmount(ev.target.value)}
          placeholder="Enter the amount (Max: 50000)"
        />
      </div>
      <SdkControlPanelResult cyData="panel-request-airdrop" data={result} />
    </div>
  )
}
