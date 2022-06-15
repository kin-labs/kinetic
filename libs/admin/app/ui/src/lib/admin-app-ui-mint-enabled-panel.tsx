import { SettingsIcon } from '@chakra-ui/icons'
import { Button, Code, Flex, Stack, Text } from '@chakra-ui/react'
import { AdminClusterUiMintDetails } from '@kin-kinetic/admin/cluster/ui'
import { Mint, Wallet } from '@kin-kinetic/shared/util/admin-sdk'
import React, { useState } from 'react'

export function AdminAppUiMintEnabledPanel({
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
