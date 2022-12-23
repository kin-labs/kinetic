import { RepeatIcon } from '@chakra-ui/icons'
import { Avatar, AvatarGroup, Box, Code, Flex, Input, Stack, useToast } from '@chakra-ui/react'
import { WebUiCopy } from '@kin-kinetic/web/ui/copy'
import { WebUiIdenticon } from '@kin-kinetic/web/ui/identicon'
import {
  useUserAppEnvWalletRemoveMutation,
  useUserWalletAirdropQuery,
  useUserWalletBalanceQuery,
  Wallet,
} from '@kin-kinetic/web/util/sdk'
import { Button, ButtonGroup } from '@saas-ui/react'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

export interface WebAppUiWalletProps {
  appEnvId: string
  appId: string
  explorerUrl: string
  wallet: Wallet
}

export function WebAppUiWallet({ appEnvId, appId, explorerUrl, wallet }: WebAppUiWalletProps) {
  const toast = useToast()
  const [amount, setAmount] = useState<number>(1)
  const [, removeWalletMutation] = useUserAppEnvWalletRemoveMutation()
  const [{ data, error }, refreshWallet] = useUserWalletBalanceQuery({
    variables: {
      appEnvId,
      walletId: wallet.id,
    },
  })

  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const [{ data: airdropData, error: airdropError, fetching: airdropFetching }, requestAirdropMutation] =
    useUserWalletAirdropQuery({
      variables: {
        appEnvId,
        walletId: wallet.id,
        amount,
      },
      pause: true,
    })

  const removeWallet = () => {
    if (!window.confirm('Are you sure you want to remove this wallet from this environment?')) return
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

  const getExplorerUrl = (path: string) => explorerUrl?.replace(`{path}`, path)

  return (
    <Stack borderWidth="1px" rounded="lg" p={6} spacing={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <WebUiIdenticon name={wallet.publicKey} />
          <Stack spacing={0}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Code colorScheme="purple">{wallet?.publicKey}</Code>
              <WebUiCopy size={'xs'} text={wallet.publicKey ?? ''} />
            </Stack>
            <Box fontWeight="semibold" fontSize="lg" lineHeight="tight" noOfLines={1}>
              <ShowSolBalance balance={data?.balance ?? 0} />
            </Box>
          </Stack>
        </Stack>
        <Button variant="ghost" onClick={() => refresh()}>
          <RepeatIcon boxSize={6} color="gray.500" />
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Button mr={2} size="sm" as={'a'} href={getExplorerUrl(`account/${wallet?.publicKey}`)} target={'_blank'}>
            View on Explorer
          </Button>
          <Button mr={2} size="sm" as={Link} to={`/apps/${appId}/environments/${appEnvId}/settings`}>
            Mints
          </Button>
          {wallet?.appMints?.length ? (
            <AvatarGroup size="sm">
              {wallet?.appMints?.map((appMint) =>
                appMint?.mint?.logoUrl ? (
                  <Avatar key={appMint.id} name={appMint?.mint?.symbol || ''} src={appMint?.mint?.logoUrl || ''} />
                ) : (
                  <WebUiIdenticon key={appMint.id} name={appMint?.mint?.symbol || ''} />
                ),
              )}
            </AvatarGroup>
          ) : (
            <Flex>
              <Button onClick={removeWallet} mr={2} size="sm">
                Remove Wallet
              </Button>
            </Flex>
          )}
        </Flex>
        <ButtonGroup>
          <Button size="sm" onClick={requestAirdrop} disabled={airdropFetching}>
            Airdrop SOL
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
          {airdropData?.response?.signature ? (
            <Box>
              <Button as={'a'} href={getExplorerUrl(`tx/${airdropData?.response?.signature}`)} target={'_blank'}>
                View Airdrop transaction on Solana Explorer
              </Button>
            </Box>
          ) : (
            <Box as="pre" marginY={10}>
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

/**
 * There are 1-billion lamports in one SOL
 */
export const LAMPORTS_PER_SOL = 1000000000

export function ShowSolBalance({ balance }: { balance?: number | string }) {
  return <span>{balance ? Number(balance) / LAMPORTS_PER_SOL : 0} SOL</span>
}
