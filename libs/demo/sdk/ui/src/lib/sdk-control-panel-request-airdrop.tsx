import { Button, Input, Stack } from '@chakra-ui/react'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import React, { ChangeEvent, useState } from 'react'
import { MintSwitcher } from './mint-switcher'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelRequestAirdrop({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  const mints = sdk?.config()?.mints.filter((mint) => mint.airdrop) || []
  const [mint, setMint] = useState<AppConfigMint>(mints[0])
  const [result, setResult] = useState<unknown>(null)
  const [amount, setAmount] = useState<string>('12345')
  const getResult = () => {
    sdk.requestAirdrop({ account: keypair.publicKey, amount, mint: mint.publicKey }).then((res) => setResult(res.data))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button className="request-airdrop-btn" onClick={getResult}>
          Request Airdrop
        </Button>
        <MintSwitcher mint={mint} mints={mints} selectMint={setMint} />
        <Input
          w="fit-content"
          type="number"
          value={amount}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAmount(ev.target.value)}
          placeholder="Enter the amount (Max: 50000)"
        />
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
