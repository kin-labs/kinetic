import { SettingsIcon } from '@chakra-ui/icons'
import { Button, Code, Flex, FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react'
import { AdminClusterUiMintDetails } from '@kin-kinetic/admin/cluster/ui'
import { AdminUiAddress } from '@kin-kinetic/admin/ui/address'
import { AdminUiIdenticon } from '@kin-kinetic/admin/ui/identicon'
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
  const [addMemo, setAddMemo] = useState<boolean>(!!mint?.addMemo)
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
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="add-memo" mb="0">
              Add Memo Instruction
            </FormLabel>
            <Switch id="add-memo" disabled isChecked={addMemo} onChange={() => setAddMemo(!addMemo)} />
          </FormControl>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <AdminUiIdenticon name={wallet?.publicKey} size={'sm'} />
            <Flex flexGrow={1}>
              <Code colorScheme="teal">
                <AdminUiAddress address={wallet?.publicKey || ''} />
              </Code>
            </Flex>
            <Button size="sm" disabled>
              Fee Payer
            </Button>
          </Stack>
          {availableWallets?.map((item) => (
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" key={item.id}>
              <AdminUiIdenticon name={item?.publicKey} size={'sm'} />
              <Flex flexGrow={1}>
                <Code colorScheme="teal">
                  <AdminUiAddress address={item?.publicKey || ''} />
                </Code>
              </Flex>
              <Button size="sm" onClick={() => selectWallet(item.id!)}>
                Use as Fee Payer
              </Button>
            </Stack>
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
