import { Box, Stack } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import { Button } from '@saas-ui/react'
import { useEffect, useState } from 'react'
import { WebToolboxUiAppConfig } from './web-toolbox-ui-app-config'
import { WebToolboxUiCloseAccount } from './web-toolbox-ui-close-account'
import { WebToolboxUiCreateAccount } from './web-toolbox-ui-create-account'
import { WebToolboxUiDebug } from './web-toolbox-ui-debug'
import { WebToolboxUiGetAccountInfo } from './web-toolbox-ui-get-account-info'
import { WebToolboxUiGetBalance } from './web-toolbox-ui-get-balance'
import { WebToolboxUiGetHistory } from './web-toolbox-ui-get-history'
import { WebToolboxUiGetTokenAccounts } from './web-toolbox-ui-get-token-accounts'
import { WebToolboxUiGetTransaction } from './web-toolbox-ui-get-transaction'
import { WebToolboxUiKeypairCard } from './web-toolbox-ui-keypair.card'
import { WebToolboxUiMakeTransfer } from './web-toolbox-ui-make-transfer'
import { WebToolboxUiRequestAirdrop } from './web-toolbox-ui-request-airdrop'

export function WebToolboxUi({ keypair, sdk }: { keypair: Keypair; sdk: KineticSdk }) {
  const [selectedMint, setSelectedMint] = useState<AppConfigMint | undefined>(sdk?.config?.mint)
  const [activeAccount, setActiveAccount] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [showConfig, setShowConfig] = useState<boolean>(false)

  useEffect(() => {
    console.log(`WebToolboxUi: Public key updated ${keypair.publicKey} or refreshed ${refresh}`)
    sdk.getBalance({ account: keypair.publicKey }).then((res) => {
      setActiveAccount(res.tokens.length > 0)
    })
  }, [keypair.publicKey, refresh])

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      {sdk.config && (
        <WebToolboxUiAppConfig selectedMint={selectedMint} setSelectedMint={setSelectedMint} config={sdk.config} />
      )}
      {keypair && (
        <WebToolboxUiKeypairCard keypair={keypair} explorer={sdk.getExplorerUrl(`address/${keypair.publicKey}`)} />
      )}
      <WebToolboxUiGetAccountInfo keypair={keypair} sdk={sdk} />
      {activeAccount ? (
        <Stack spacing={{ base: 2, md: 6 }}>
          <WebToolboxUiGetBalance keypair={keypair} sdk={sdk} />
          <WebToolboxUiMakeTransfer keypair={keypair} sdk={sdk} selectedMint={selectedMint} />
          {/* FIXME: Implement UI for makeTransferBatch */}
          {/*<WebToolboxUiMakeTransferBatch*/}
          {/*  keypair={keypair}*/}
          {/*  sdk={sdk}*/}
          {/*  selectedMint={selectedMint}*/}
          {/*/>*/}
          <WebToolboxUiRequestAirdrop selectedMint={selectedMint} keypair={keypair} sdk={sdk} />
          <WebToolboxUiGetTransaction sdk={sdk} />
          <WebToolboxUiGetHistory keypair={keypair} sdk={sdk} selectedMint={selectedMint} />
          <WebToolboxUiGetTokenAccounts selectedMint={selectedMint} keypair={keypair} sdk={sdk} />
          <WebToolboxUiCloseAccount finished={() => setRefresh(!refresh)} keypair={keypair} sdk={sdk} />
        </Stack>
      ) : (
        <WebToolboxUiCreateAccount keypair={keypair} sdk={sdk} finished={() => setRefresh(!refresh)} />
      )}
      <Stack borderWidth="1px" rounded="lg" p={6} spacing={6}>
        <Box>
          <Button variant="primary" size="lg" onClick={() => setShowConfig(!showConfig)}>
            {showConfig ? 'Hide' : 'Show'} App Config
          </Button>
        </Box>

        {showConfig ? <WebToolboxUiDebug data={sdk.config} /> : null}
      </Stack>
    </Stack>
  )
}
