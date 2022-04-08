import { Keypair } from '@mogami/keypair'
import { Sdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from 'react-daisyui'
import { KeypairEntity } from '../../data-access/keypair'
import { UiAlert } from '../../ui/ui-alert/ui-alert'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelSubmitPayment({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [accountId, setAccountId] = useState<string>('FET3bRjswDCGwLJLZzJtGepb33YwP64kjrRHo314rXmS')
  const [amount, setAmount] = useState<string>('45')

  if (!keypair.mnemonic) {
    return <UiAlert message="Mnemonic not found on KeypairEntity" />
  }

  const kp: Keypair = Keypair.fromMnemonicSet(keypair.mnemonic)[0]

  const getResult = async () => {
    const res = await sdk.makeTransfer({
      amount,
      destination: accountId,
      owner: kp,
    })
    setResult(res)
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-2 items-center">
        <Button className="submit-payment-btn" onClick={getResult}>
          Submit Payment
        </Button>
        <Input
          className="w-full"
          bordered
          value={accountId}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAccountId(ev.target.value)}
          placeholder="Enter the destination accountId"
        />
        <Input
          className="w-full"
          bordered
          value={amount}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAmount(ev.target.value)}
          placeholder="Enter the amount"
        />
      </div>
      <SdkControlPanelResult cyData="panel-submit-payment" data={result} />
    </div>
  )
}
