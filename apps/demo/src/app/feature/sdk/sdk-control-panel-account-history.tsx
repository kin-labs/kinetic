import { Button, Input, Stack } from '@chakra-ui/react'
import { Sdk } from '@mogami/sdk'
import React, { ChangeEvent, useState } from 'react'
import { KeypairEntity } from '../../data-access/keypair'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelAccountHistory({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [value, setValue] = useState<string>(keypair.publicKey)
  const getResult = () => {
    sdk.getHistory(value).then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="get-account-history-btn" onClick={getResult}>
          Get Account History
        </Button>
        <Input
          w="full"
          value={value}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)}
          placeholder="Enter the accountId (Public Key for the Account owner)"
        />
      </Stack>
      <SdkControlPanelResult cyData="panel-get-account-history" data={result} />
    </Stack>
  )
}
