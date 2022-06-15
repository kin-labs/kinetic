import { Button, Stack } from '@chakra-ui/react'
import { TransactionType } from '@kin-tools/kin-memo'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Destination } from '@kin-kinetic/solana'
import React, { useState } from 'react'

import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelMakePaymentBatch({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const destinations: Destination[] = [
    { destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y', amount: '42' },
    { destination: 'CharYfTvJSiH6LtDpkGUiVVZmeCn5Cenu2TzdJSbDJnG', amount: '34' },
    { destination: 'DAVEXJQuNAzUaVZsFeDiUr67WikDH3cj4L1YHyx5t2Nj', amount: '51' },
  ]

  if (!keypair.secretKey) {
    return <AdminUiAlert message="Invalid keypair found in DemoKeypairEntity" />
  }

  const kp: Keypair = Keypair.fromSecretKey(keypair.secretKey)

  const getResult = async () => {
    setResult(null)
    const res = await sdk.makeTransferBatch({
      destinations,
      owner: kp,
      type: TransactionType.Spend,
    })
    setResult(res)
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <div>
          <Button className="submit-batch-payments-btn" onClick={getResult}>
            Submit Payment Batch
          </Button>
        </div>
      </Stack>
      <SdkControlPanelResult data={result} />
    </Stack>
  )
}
