import { Sdk } from '@mogami/sdk'
import React from 'react'
import { KeypairEntity } from '../../data-access/keypair'
import { UiAlert } from '../../ui/ui-alert/ui-alert'
import { SdkControlPanelAccountBalance } from './sdk-control-panel-account-balance'
import { SdkControlPanelAccountHistory } from './sdk-control-panel-account-history'
import { SdkControlPanelCreateAccount } from './sdk-control-panel-create-account'
import { SdkControlPanelRequestAirdrop } from './sdk-control-panel-request-airdrop'
import { SdkControlPanelServerConfig } from './sdk-control-panel-server-config'
import { SdkControlPanelSubmitPayment } from './sdk-control-panel-submit-payment'
import { SdkControlPanelTokenAccounts } from './sdk-control-panel-token-accounts'

export function SdkControlPanel({ keypair, sdk }: { keypair: KeypairEntity; sdk: Sdk }) {
  return (
    <div className="flex flex-col space-y-6">
      <UiAlert status="success" title="SDK Configured" message={`The SDK is connected to ${sdk.endpoint}`} />
      <SdkControlPanelServerConfig sdk={sdk} />
      <SdkControlPanelAccountBalance keypair={keypair} sdk={sdk} />
      <SdkControlPanelTokenAccounts keypair={keypair} sdk={sdk} />
      <SdkControlPanelAccountHistory keypair={keypair} sdk={sdk} />
      <SdkControlPanelRequestAirdrop keypair={keypair} sdk={sdk} />
      <SdkControlPanelCreateAccount keypair={keypair} sdk={sdk} />
      <SdkControlPanelSubmitPayment keypair={keypair} sdk={sdk} />
    </div>
  )
}
