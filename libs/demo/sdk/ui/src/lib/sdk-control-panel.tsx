import { Stack } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { DemoKeypairEntity } from '@kin-kinetic/demo/keypair/data-access'
import { KineticSdk, NAME, VERSION } from '@kin-kinetic/sdk'
import React from 'react'

import { SdkControlPanelAccountBalance } from './sdk-control-panel-account-balance'
import { SdkControlPanelAccountHistory } from './sdk-control-panel-account-history'
import { SdkControlPanelAppConfig } from './sdk-control-panel-app-config'
import { SdkControlPanelCreateAccount } from './sdk-control-panel-create-account'
import { SdkControlPanelGetTransaction } from './sdk-control-panel-get-transaction'
import { SdkControlPanelMakePayment } from './sdk-control-panel-make-payment'
import { SdkControlPanelMakePaymentBatch } from './sdk-control-panel-make-payment-batch'
import { SdkControlPanelRequestAirdrop } from './sdk-control-panel-request-airdrop'
import { SdkControlPanelTokenAccounts } from './sdk-control-panel-token-accounts'

export function SdkControlPanel({ keypair, sdk }: { keypair: DemoKeypairEntity; sdk: KineticSdk }) {
  return (
    <Stack spacing={6}>
      <AdminUiAlert
        status="success"
        title={`SDK: ${NAME}@${VERSION}`}
        message={`Connected to ${sdk.endpoint}, app ${sdk?.config?.app?.index}, environment ${sdk?.config?.environment?.name}`}
      />
      <SdkControlPanelAppConfig sdk={sdk} />
      <SdkControlPanelAccountBalance keypair={keypair} sdk={sdk} />
      <SdkControlPanelTokenAccounts keypair={keypair} sdk={sdk} />
      <SdkControlPanelAccountHistory keypair={keypair} sdk={sdk} />
      <SdkControlPanelRequestAirdrop keypair={keypair} sdk={sdk} />
      <SdkControlPanelCreateAccount keypair={keypair} sdk={sdk} />
      <SdkControlPanelMakePayment keypair={keypair} sdk={sdk} />
      <SdkControlPanelMakePaymentBatch keypair={keypair} sdk={sdk} />
      <SdkControlPanelGetTransaction sdk={sdk} />
    </Stack>
  )
}
