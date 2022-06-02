import { MogamiSdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Stack } from '@chakra-ui/react'
import { DemoKeypairEntity } from '@mogami/demo/keypair/data-access'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelRequestAirdrop({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: MogamiSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [amount, setAmount] = useState<string>('12345')
  const getResult = () => {
    sdk.requestAirdrop(keypair.publicKey, amount).then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="request-airdrop-btn" onClick={getResult}>
          Request Airdrop
        </Button>
        <Input
          w="full"
          type="number"
          value={amount}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAmount(ev.target.value)}
          placeholder="Enter the amount (Max: 50000)"
        />
      </Stack>
      <SdkControlPanelResult cyData="panel-request-airdrop" data={result} />
    </Stack>
  )
}
