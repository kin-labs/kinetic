import { Button, Input, Stack } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import { TransactionType } from '@kin-tools/kin-memo'
import React, { ChangeEvent, useState } from 'react'
import { MintSwitcher } from './mint-switcher'

import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelMakePayment({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  const mints = sdk?.config?.mints || []
  const [mint, setMint] = useState<AppConfigMint>(mints[0])
  const [result, setResult] = useState<unknown>(null)
  const [accountId, setAccountId] = useState<string>('BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y')
  const [amount, setAmount] = useState<string>('1050')

  if (!keypair.secretKey) {
    return <AdminUiAlert message="Invalid keypair found in DemoKeypairEntity" />
  }

  const kp: Keypair = Keypair.fromSecretKey(keypair.secretKey)

  const getResult = async () => {
    setResult(null)
    const res = await sdk.makeTransfer({
      amount,
      destination: accountId,
      mint: mint.publicKey,
      owner: kp,
      referenceId: Date.now().toString(),
      referenceType: 'DemoPayment',
      type: TransactionType.Spend,
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
        <MintSwitcher mint={mint} mints={mints} selectMint={setMint} />
        <Input
          w="fit-content"
          value={accountId}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAccountId(ev.target.value)}
          placeholder="Enter the destination accountId"
        />
        <Input
          w="fit-content"
          value={amount}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setAmount(ev.target.value)}
          placeholder="Enter the amount"
        />
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
