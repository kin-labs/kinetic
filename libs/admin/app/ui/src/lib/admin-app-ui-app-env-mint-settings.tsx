import { SettingsIcon } from '@chakra-ui/icons'
import { Box, Button, Code, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AdminClusterUiMintDetails } from '@mogami/admin/cluster/ui'
import { AdminUiAlert } from '@mogami/admin/ui/alert'
import { AppEnv, Mint, Wallet } from '@mogami/shared/util/admin-sdk'
import React, { useState } from 'react'

export interface AdminAppUiAppEnvMintSettingsProps {
  appEnv: AppEnv
  disableMint: (mintId: string) => void
  enableMint: (mintId: string) => void
  selectWallet: (mintId: string, walletId: string) => void
}

export function AdminAppUiAppEnvMintSettings({
  appEnv,
  disableMint,
  enableMint,
  selectWallet,
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
      <SimpleGrid columns={2} gap={6}>
        {appEnv?.mints?.map((mint) => (
          <EnabledMintPanel
            key={mint?.id}
            mint={mint!.mint}
            wallet={mint!.wallet}
            wallets={wallets}
            selectWallet={(walletId) => selectWallet(mint.id, walletId)}
            disableMint={disableMint}
          />
        ))}
      </SimpleGrid>

      <Text>Available Mints</Text>
      {clusterMints?.length ? (
        <SimpleGrid columns={2} gap={6}>
          {clusterMints?.map((mint) => (
            <DisabledMintPanel key={mint?.id} mint={mint} enableMint={enableMint} />
          ))}
        </SimpleGrid>
      ) : (
        <AdminUiAlert status={'info'} message="All available mints are enabled." />
      )}
    </Stack>
  )
}

function DisabledMintPanel({ enableMint, mint }: { enableMint: (mintId: string) => void; mint?: Mint | null }) {
  return mint && mint?.id ? (
    <Stack direction="column" spacing={6} p={6} borderWidth="1px" borderRadius="lg" key={mint?.id}>
      {mint && <AdminClusterUiMintDetails mint={mint} />}
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="lg" onClick={() => enableMint(mint!.id!)}>
          Enable {mint?.symbol}
        </Button>
      </Flex>
    </Stack>
  ) : null
}

function EnabledMintPanel({
  disableMint,
  mint,
  selectWallet,
  wallet,
  wallets,
}: {
  disableMint: (mintId: string) => void
  mint?: Mint | null
  selectWallet: (walletId: string) => void
  wallet?: Wallet | null
  wallets?: Wallet[]
}) {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => setShowDetails((value) => !value)
  const availableWallets = wallets?.filter((item) => item.id !== wallet?.id)
  return mint && mint?.id ? (
    <Stack direction="column" spacing={6} p={6} borderWidth="1px" borderRadius="lg">
      <AdminClusterUiMintDetails mint={mint} />
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="lg" onClick={toggleDetails}>
          <SettingsIcon /> <Text ml={2}>Settings</Text>
        </Button>
      </Flex>
      {showDetails ? (
        <Stack direction="column" spacing={6}>
          <Code colorScheme="teal">{wallet?.publicKey}</Code>
          {availableWallets?.map((item) => (
            <Flex justifyContent="space-between" alignItems="center" key={item.id}>
              <Code colorScheme="teal">{item?.publicKey}</Code>
              <Button size="sm" onClick={() => selectWallet(item.id!)}>
                Use as Fee Payer
              </Button>
            </Flex>
          ))}
          <Flex justifyContent="space-between" alignItems="center">
            <Button size="lg" disabled={!!mint?.default} onClick={() => disableMint(mint.id!)}>
              {mint?.default ? 'Default mint' : `Disable ${mint?.symbol}`}
            </Button>
          </Flex>
        </Stack>
      ) : null}
    </Stack>
  ) : null
}
