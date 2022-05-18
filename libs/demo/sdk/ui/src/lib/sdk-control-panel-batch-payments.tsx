import { Button, Stack } from '@chakra-ui/react'
import { TransactionType } from '@kin-tools/kin-memo'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { DemoKeypairEntity } from '@mogami/demo/keypair/data-access'
import { Keypair } from '@mogami/keypair'
import { MogamiSdk } from '@mogami/sdk'
import { Payment } from '@mogami/solana'
import React, { useState } from 'react'

import { SdkControlPanelResult } from './sdk-control-panel-result'

export function SdkControlPanelBatchPayments({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: MogamiSdk }) {
  const [result, setResult] = useState<unknown>(null)
  const [payments, setPayments] = useState<Payment[]>([
    { destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y', amount: '42' },
    { destination: 'Akvroph4nnerMa16JC5ztjMuD6PpSEwP6oyY1xma8NUp', amount: '34' },
    { destination: 'EKJ9qSMfQEtczS8D1FYobWamoUXTYknAndqNQTTyacD7', amount: '51' },
    { destination: 'Eq5jM9QKyRj7JhXW4RPxFmGMytzh3smdWBpVRQFieRsv', amount: '87' },
  ])

  if (!keypair.secretKey) {
    return <AdminUiAlert message="Invalid keypair found in DemoKeypairEntity" />
  }

  const kp: Keypair = Keypair.fromSecretKey(keypair.secretKey)

  const getResult = async () => {
    setResult(null)
    const res = await sdk.makeBatchTransfers({
      payments,
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
            Submit Batch Payments
          </Button>
        </div>
      </Stack>
      <SdkControlPanelResult cyData="panel-submit-payment" data={result} />
    </Stack>
  )
}
