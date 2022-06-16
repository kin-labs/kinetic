import { RepeatIcon } from '@chakra-ui/icons'
import { Avatar, AvatarGroup, Box, Button, ButtonGroup, Code, Flex, Input, Stack, useToast } from '@chakra-ui/react'
import { AdminUiIdenticon } from '@kin-kinetic/admin/ui/identicon'
import {
  useUserAppEnvWalletRemoveMutation,
  useUserDeleteWalletMutation,
  useUserWalletAirdropQuery,
  useUserWalletBalanceQuery,
  Wallet,
} from '@kin-kinetic/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShowSolBalance } from './show-sol-balance'

export interface AdminAppUiWalletProps {
  appEnvId: string
  appId: string
  wallet: Wallet
}

export function AdminAppUiWallet({ appEnvId, appId, wallet }: AdminAppUiWalletProps) {
  const toast = useToast()
  const [amount, setAmount] = useState<number>(1)
  const [_, removeWalletMutation] = useUserAppEnvWalletRemoveMutation()
  const [{ data }, refreshWallet] = useUserWalletBalanceQuery({
    variables: {
      appEnvId,
      walletId: wallet.id,
    },
  })
  const [{ data: airdropData, error: airdropError, fetching: airdropFetching }, requestAirdropMutation] =
    useUserWalletAirdropQuery({
      variables: {
        appEnvId,
        walletId: wallet.id,
        amount,
      },
      pause: true,
    })

  const deleteWallet = () => {
    if (!window.confirm('Are you sure?')) return
    removeWalletMutation({ appId, walletId: wallet.id, appEnvId }).then(() => {
      toast({ status: 'success', title: 'Wallet removed' })
    })
  }
  const requestAirdrop = async () => {
    requestAirdropMutation()
    await refreshWallet()
  }
  const refresh = () => {
    refreshWallet()
    toast({ status: 'success', title: 'Wallet refreshed' })
  }

  return (
    <Stack borderWidth="1px" rounded="lg" p={6} spacing={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link to={`/apps/${appId}/environments/${appEnvId}/wallets/${wallet?.id}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <AdminUiIdenticon name={wallet.publicKey} />
            <Stack spacing={0}>
              <Code colorScheme="teal">{wallet?.publicKey}</Code>
              <Box fontWeight="semibold" fontSize="lg" lineHeight="tight" noOfLines={1}>
                <ShowSolBalance balance={data?.balance?.balance} />
              </Box>
            </Stack>
          </Stack>
        </Link>
        <Button variant="ghost" onClick={() => refresh()}>
          <RepeatIcon boxSize={6} color="gray.500" />
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Button as={Link} to={`/apps/${appId}/environments/${appEnvId}/settings`} mr={2} size="sm">
            Mints
          </Button>
          {wallet?.appMints?.length ? (
            <AvatarGroup size="sm">
              {wallet?.appMints?.map((appMint) => (
                <Avatar key={appMint.id} name={appMint?.mint?.symbol || ''} src={appMint?.mint?.logoUrl || ''} />
              ))}
            </AvatarGroup>
          ) : (
            <Flex>
              <Button onClick={deleteWallet} disabled={data?.balance?.balance !== 0} mr={2} size="sm">
                Delete Wallet
              </Button>
            </Flex>
          )}
        </Flex>
        <ButtonGroup>
          <Button size="sm" onClick={requestAirdrop} disabled={airdropFetching}>
            Airdrop
          </Button>
          <Input
            size="sm"
            width="10"
            value={amount}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target?.value))}
          />
        </ButtonGroup>
      </Flex>
      {(airdropData?.response || airdropError) && (
        <Stack direction="column" spacing={6}>
          {airdropData?.response && (
            <Box as="pre" marginY={10}>
              Airdrop Signature
              {JSON.stringify(airdropData?.response, null, 2)}
            </Box>
          )}
          {airdropError && (
            <Box as="pre" marginY={10}>
              Airdrop Error
              {JSON.stringify(airdropError, null, 2)}
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  )
}
