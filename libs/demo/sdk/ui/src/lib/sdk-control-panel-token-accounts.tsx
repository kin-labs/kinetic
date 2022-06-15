import { Button, Input, Stack } from '@chakra-ui/react'
import { KineticSdk } from '@kin-kinetic/sdk'
import React, { ChangeEvent, useState } from 'react'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelTokenAccounts({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [value, setValue] = useState<string>(keypair.publicKey)
  const getResult = () => {
    sdk.tokenAccounts(value).then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-token-accounts-btn" onClick={getResult}>
          Get Token Accounts
        </Button>
        <Input
          w="full"
          value={value}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)}
          placeholder="Enter the accountId (Public Key for the Account owner)"
        />
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
