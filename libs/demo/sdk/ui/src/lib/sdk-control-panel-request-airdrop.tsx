import { Button, Input, Stack } from '@chakra-ui/react'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import React, { ChangeEvent, useState } from 'react'
import { CommitmentSwitcher } from './commitment-switcher'
import { MintSwitcher } from './mint-switcher'
import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelRequestAirdrop({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  const mints = sdk?.config?.mints.filter((mint) => mint?.airdrop) || []
  const [mint, setMint] = useState<AppConfigMint | undefined>(mints.length ? mints[0] : undefined)
  const [result, setResult] = useState<unknown>(null)
  const [commitment, setCommitment] = useState<Commitment>(Commitment.Confirmed)
  const [amount, setAmount] = useState<string>('12345')
  const getResult = () => {
    if (!mint) return
    sdk
      .requestAirdrop({ account: keypair.publicKey, amount, commitment, mint: mint.publicKey })
      .then((res) => setResult(res))
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button disabled={!mint} onClick={getResult}>
          Request Airdrop
        </Button>
        {mint && <MintSwitcher mint={mint} mints={mints} selectMint={setMint} />}
        <CommitmentSwitcher commitment={commitment} selectCommitment={setCommitment} />
        <Input
          disabled={!mint}
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
