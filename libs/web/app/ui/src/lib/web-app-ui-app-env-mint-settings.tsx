import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { AppEnv, UserAppMintUpdateInput } from '@kin-kinetic/web/util/sdk'
import { WebAppUiMintDisabledPanel } from './web-app-ui-mint-disabled-panel'
import { WebAppUiMintEnabledPanel } from './web-app-ui-mint-enabled-panel'

export interface WebAppUiAppEnvMintSettingsProps {
  appEnv: AppEnv
  disableMint: (mintId: string) => void
  enableMint: (mintId: string) => void
  selectWallet: (mintId: string, walletId: string) => void
  updateAppMint: (mintId: string, input: UserAppMintUpdateInput) => void
}

export function WebAppUiAppEnvMintSettings({
  appEnv,
  disableMint,
  enableMint,
  selectWallet,
  updateAppMint,
}: WebAppUiAppEnvMintSettingsProps) {
  const appEnvMintIds = appEnv.mints?.map((mint) => mint.mint).map((mint) => mint!.id!) || []
  const wallets = appEnv?.wallets || []
  const clusterMints = appEnv.cluster?.mints?.filter((mint) => !appEnvMintIds?.includes(mint!.id!))
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebUiCard>
        <Heading size="md">Mints</Heading>
      </WebUiCard>

      <WebUiCard>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Heading size="md">Enabled mints</Heading>
          <SimpleGrid columns={{ base: 1 }} gap={6}>
            {appEnv?.mints?.map((appMint) => (
              <WebAppUiMintEnabledPanel
                key={appMint?.id}
                appMint={appMint}
                wallet={appMint!.wallet}
                wallets={wallets}
                updateAppMint={(input) => updateAppMint(appMint.id, input)}
                selectWallet={(walletId) => selectWallet(appMint.id, walletId)}
                disableMint={disableMint}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </WebUiCard>

      <WebUiCard>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Heading size="md">Available mints</Heading>
          {clusterMints?.length ? (
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
              {clusterMints?.map((mint) => (
                <WebAppUiMintDisabledPanel key={mint?.id} mint={mint} enableMint={enableMint} />
              ))}
            </SimpleGrid>
          ) : (
            <WebUiAlert status={'info'} message="All available mints are enabled." />
          )}
        </Stack>
      </WebUiCard>
    </Stack>
  )
}
