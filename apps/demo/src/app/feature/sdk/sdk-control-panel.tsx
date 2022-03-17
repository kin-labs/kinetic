import { Sdk } from '@mogami/sdk'
import React from 'react'
import { UiAlert } from '../../ui/ui-alert/ui-alert'
import { SdkControlPanelAccountBalance } from './sdk-control-panel-account-balance'
import { SdkControlPanelAccountHistory } from './sdk-control-panel-account-history'
import { SdkControlPanelServerConfig } from './sdk-control-panel-server-config'
import { SdkControlPanelTokenAccounts } from './sdk-control-panel-token-accounts'

export function SdkControlPanel({ sdk }: { sdk: Sdk }) {
  return (
    <div className="flex flex-col space-y-6">
      <UiAlert status="success" title="SDK Configured" message={`The SDK is connected to ${sdk.endpoint}`} />
      <SdkControlPanelServerConfig sdk={sdk} />
      <SdkControlPanelAccountBalance sdk={sdk} />
      <SdkControlPanelTokenAccounts sdk={sdk} />
      <SdkControlPanelAccountHistory sdk={sdk} />
    </div>
  )
}
