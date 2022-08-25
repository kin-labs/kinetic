import { Button, Input, Stack } from '@chakra-ui/react'
import { KineticSdk } from '@kin-kinetic/sdk'
import React, { ChangeEvent, useState } from 'react'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelGetTransaction({ sdk }: { sdk: KineticSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [signature, setSignature] = useState<string>('')
  const getResult = () => {
    sdk.getTransaction(signature).then((res) => setResult(res))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={getResult}>Get Transaction</Button>
        <Input
          w="fit-content"
          value={signature}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setSignature(ev.target.value)}
          placeholder="Enter the transaction signature"
        />
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
