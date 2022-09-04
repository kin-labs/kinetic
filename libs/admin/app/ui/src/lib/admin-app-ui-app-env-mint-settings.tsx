import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import { AppEnv, UserAppMintUpdateInput } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { AdminAppUiMintDisabledPanel } from './admin-app-ui-mint-disabled-panel'
import { AdminAppUiMintEnabledPanel } from './admin-app-ui-mint-enabled-panel'

export interface AdminAppUiAppEnvMintSettingsProps {
  appEnv: AppEnv
  disableMint: (mintId: string) => void
  enableMint: (mintId: string) => void
  selectWallet: (mintId: string, walletId: string) => void
  updateAppMint: (mintId: string, input: UserAppMintUpdateInput) => void
}

export function AdminAppUiAppEnvMintSettings({
  appEnv,
  disableMint,
  enableMint,
  selectWallet,
  updateAppMint,
}: AdminAppUiAppEnvMintSettingsProps) {
  const appEnvMintIds = appEnv.mints?.map((mint) => mint.mint).map((mint) => mint!.id!) || []
  const wallets = appEnv?.wallets || []
  const clusterMints = appEnv.cluster?.mints?.filter((mint) => !appEnvMintIds?.includes(mint!.id!))
  return (
    <Stack p={6} borderWidth="1px" rounded="lg" direction="column" spacing={6}>
      <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
        App Mint Settings
      </Box>

      <Text>Enabled Mints</Text>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {appEnv?.mints?.map((appMint) => (
          <AdminAppUiMintEnabledPanel
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

      <Text>Available Mints</Text>
      {clusterMints?.length ? (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          {clusterMints?.map((mint) => (
            <AdminAppUiMintDisabledPanel key={mint?.id} mint={mint} enableMint={enableMint} />
          ))}
        </SimpleGrid>
      ) : (
        <AdminUiAlert status={'info'} message="All available mints are enabled." />
      )}
    </Stack>
  )
}
