import { Button, Input, Stack } from '@chakra-ui/react'
import { Sdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
import { DemoKeypairEntity } from '@mogami/demo/keypair/data-access'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAccountBalance({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [value, setValue] = useState<string>(keypair.publicKey)
  const getResult = () => {
    sdk.balance(value).then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-account-balance-btn" onClick={getResult}>
          Get Account Balance
        </Button>
        <Input
          w="full"
          value={value}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)}
          placeholder="Enter the accountId (Public Key for the Account owner)"
        />
      </Stack>
      <SdkControlPanelResult cyData="panel-get-account-balance" data={result} />
    </Stack>
  )
}
