import { SettingsIcon } from '@chakra-ui/icons'
import { Button, Code, Flex, FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react'
import { AdminClusterUiMintDetails } from '@kin-kinetic/admin/cluster/ui'
import { AdminUiAddress } from '@kin-kinetic/admin/ui/address'
import { AdminUiIdenticon } from '@kin-kinetic/admin/ui/identicon'
import { AppMint, UserAppMintUpdateInput, Wallet } from '@kin-kinetic/shared/util/admin-sdk'
import React, { useState } from 'react'

export function AdminAppUiMintEnabledPanel({
  appMint,
  disableMint,
  selectWallet,
  updateAppMint,
  wallet,
  wallets,
}: {
  appMint: AppMint
  disableMint: (mintId: string) => void
  selectWallet: (walletId: string) => void
  updateAppMint: (input: UserAppMintUpdateInput) => void
  wallet?: Wallet | null
  wallets?: Wallet[]
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [addMemo, setAddMemo] = useState<boolean>(!!appMint?.addMemo)
  const toggleDetails = () => setShowDetails((value) => !value)
  const availableWallets = wallets?.filter((item) => item.id !== wallet?.id)
  const disable = () => {
    if (!appMint?.mint?.id) return
    disableMint(appMint.mint!.id!)
  }
  return appMint && appMint?.mint && appMint?.mint?.id ? (
    <Stack direction="column" spacing={6} p={6} borderWidth="1px" borderRadius="lg">
      <AdminClusterUiMintDetails mint={appMint?.mint} />
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="lg" onClick={toggleDetails}>
          <SettingsIcon /> <Text ml={2}>Settings</Text>
        </Button>
      </Flex>
      {showDetails ? (
        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="add-memo" mb="0">
                Add Memo Instruction
              </FormLabel>
              <Switch id="add-memo" isChecked={addMemo} onChange={() => setAddMemo(!addMemo)} />
            </FormControl>
            <Button size="sm" disabled={addMemo === appMint.addMemo} onClick={() => updateAppMint({ addMemo })}>
              Save
            </Button>
          </Stack>
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
            <Button size="lg" disabled={!!appMint?.mint?.default} onClick={disable}>
              {appMint?.mint?.default ? 'Default mint' : `Disable ${appMint?.mint?.symbol}`}
            </Button>
          </Flex>
        </Stack>
      ) : null}
    </Stack>
  ) : null
}
