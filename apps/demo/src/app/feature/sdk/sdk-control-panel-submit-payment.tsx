import { Button, Input, Stack } from '@chakra-ui/react'
import { Keypair } from '@mogami/keypair'
import { Sdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
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
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <div>
          <Button className="submit-payment-btn" onClick={getResult}>
            Submit Payment
          </Button>
        </div>
        <Input
          w="full"
          value={accountId}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAccountId(ev.target.value)}
          placeholder="Enter the destination accountId"
        />
        <Input
          w="full"
          value={amount}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAmount(ev.target.value)}
          placeholder="Enter the amount"
        />
      </Stack>
      <SdkControlPanelResult cyData="panel-submit-payment" data={result} />
    </Stack>
  )
}
