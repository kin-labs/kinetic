import { Code, Flex, FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react'
import { WebUiAddress } from '@kin-kinetic/web/ui/address'
import { WebUiIdenticon } from '@kin-kinetic/web/ui/identicon'
import { AppMint, UserAppMintUpdateInput, Wallet } from '@kin-kinetic/web/util/sdk'
import { Button } from '@saas-ui/react'
import { useState } from 'react'
import { WebClusterUiMintDetails } from './web-cluster-ui-mint-details'

export function WebAppUiMintEnabledPanel({
  disableMint,
  appMint,
  selectWallet,
  updateAppMint,
  wallets,
}: {
  appMint: AppMint
  disableMint: (mintId: string) => void
  selectWallet: (appMintId: string, walletId: string) => void
  updateAppMint: (appMintId: string, input: UserAppMintUpdateInput) => void
  wallets: Wallet[]
}) {
  const [addMemo, setAddMemo] = useState<boolean>(!!appMint?.addMemo)
  const availableWallets = wallets?.filter((item) => item.id !== appMint?.wallet?.id)

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      {appMint?.mint ? (
        <Stack spacing={{ base: 2, md: 6 }}>
          <WebClusterUiMintDetails mint={appMint?.mint} />

          <Stack p="2" spacing={4}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <FormControl display="flex" alignItems="center">
                <Switch
                  id="add-memo"
                  isChecked={addMemo}
                  onChange={() => {
                    setAddMemo(!addMemo)
                    updateAppMint(appMint.id, { addMemo: !addMemo })
                  }}
                />
                <FormLabel htmlFor="add-memo" mb="0" ml={2}>
                  Add Kin Memo Instruction
                </FormLabel>
              </FormControl>
            </Stack>
            <Text color={'gray.500'} fontSize={'sm'}>
              This Memo instruction is used by the Kin Ecosystem to track the transactions.
            </Text>

            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <WebUiIdenticon size="sm" name={`${appMint?.wallet?.publicKey}`} />
              <Flex flexGrow={1}>
                <Code colorScheme="purple">
                  <WebUiAddress address={appMint?.wallet?.publicKey || ''} />
                </Code>
              </Flex>
              <Button size="sm" disabled>
                Current Fee Payer
              </Button>
            </Stack>

            {availableWallets?.map((item) => (
              <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" key={item.id}>
                <WebUiIdenticon size="sm" name={`${item?.publicKey}`} />
                <Flex flexGrow={1}>
                  <Code colorScheme="purple">
                    <WebUiAddress address={item?.publicKey || ''} />
                  </Code>
                </Flex>
                <Button size="sm" onClick={() => selectWallet(appMint.id, item.id)}>
                  Use as Fee Payer
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ) : null}
      <Flex justifyContent="space-between" alignItems="center">
        <Button size="xs" disabled={!!appMint?.mint?.default} onClick={() => disableMint(`${appMint?.mint?.id}`)}>
          {appMint?.mint?.default ? `The default mint is always enabled.` : `Disable mint`}
        </Button>
      </Flex>
    </Stack>
  )
}
