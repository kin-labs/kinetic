import { Button, Input, Stack } from '@chakra-ui/react'
import { MogamiSdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
import { DemoKeypairEntity } from '@mogami/demo/keypair/data-access'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAccountHistory({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: MogamiSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [account, setAccount] = useState<string>(keypair.publicKey)
  const getResult = () => {
    sdk.getHistory({ account }).then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-account-history-btn" onClick={getResult}>
          Get Account History
        </Button>
        <Input
          w="full"
          value={account}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAccount(ev.target.value)}
          placeholder="Enter the accountId (Public Key for the Account owner)"
        />
      </Stack>
      <SdkControlPanelResult cyData="panel-get-account-history" data={result} />
    </Stack>
  )
}
