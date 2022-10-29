import { Stack } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import { useState } from 'react'
import { WebToolboxUiAppConfig } from './web-toolbox-ui-app-config'
import { WebToolboxUiCreateAccount } from './web-toolbox-ui-create-account'
import { WebToolboxUiGetBalance } from './web-toolbox-ui-get-balance'
import { WebToolboxUiGetHistory } from './web-toolbox-ui-get-history'
import { WebToolboxUiGetTokenAccounts } from './web-toolbox-ui-get-token-accounts'
import { WebToolboxUiGetTransaction } from './web-toolbox-ui-get-transaction'
import { WebToolboxUiKeypairCard } from './web-toolbox-ui-keypair.card'
import { WebToolboxUiMakeTransfer } from './web-toolbox-ui-make-transfer'
import { WebToolboxUiRequestAirdrop } from './web-toolbox-ui-request-airdrop'

export function WebToolboxUi({ keypair, sdk }: { keypair: Keypair; sdk: KineticSdk }) {
  const [selectedMint, setSelectedMint] = useState<AppConfigMint | undefined>(sdk?.config?.mint)
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      {sdk.config && (
        <WebToolboxUiAppConfig selectedMint={selectedMint} setSelectedMint={setSelectedMint} config={sdk.config} />
      )}
      {keypair && (
        <WebToolboxUiKeypairCard keypair={keypair} explorer={sdk.getExplorerUrl(`address/${keypair.publicKey}`)} />
      )}
      <WebToolboxUiGetBalance keypair={keypair} sdk={sdk} />
      <WebToolboxUiCreateAccount keypair={keypair} sdk={sdk} />
      <WebToolboxUiGetHistory keypair={keypair} sdk={sdk} selectedMint={selectedMint} />
      <WebToolboxUiGetTokenAccounts selectedMint={selectedMint} keypair={keypair} sdk={sdk} />
      <WebToolboxUiGetTransaction sdk={sdk} />
      <WebToolboxUiRequestAirdrop selectedMint={selectedMint} keypair={keypair} sdk={sdk} />
      <WebToolboxUiMakeTransfer keypair={keypair} sdk={sdk} selectedMint={selectedMint} />
      {/*<WebToolboxUiMakeTransferBatch*/}
      {/*  keypair={keypair}*/}
      {/*  sdk={sdk}*/}
      {/*  selectedMint={selectedMint}*/}
      {/*/>*/}
    </Stack>
  )
}
