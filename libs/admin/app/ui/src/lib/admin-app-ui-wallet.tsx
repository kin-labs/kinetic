import { Box, Button, ButtonGroup, Code, Input, Stack } from '@chakra-ui/react'
import { useUserWalletAirdropQuery, useUserWalletBalanceQuery, Wallet } from '@kin-kinetic/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShowSolBalance } from './show-sol-balance'

export interface AdminAppUiWalletProps {
  appEnvId: string
  appId: string
  wallet: Wallet
}

export function AdminAppUiWallet({ appEnvId, appId, wallet }: AdminAppUiWalletProps) {
  const [amount, setAmount] = useState<number>(1)
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

  const requestAirdrop = async () => {
    requestAirdropMutation()
    await refreshWallet()
  }

  return (
    <Box borderWidth="1px" rounded="lg" p={6}>
      <Box mt="1" noOfLines={1}>
        <Link to={`/apps/${appId}/environments/${appEnvId}/wallets/${wallet?.id}`}>
          <Code colorScheme="teal">{wallet?.publicKey}</Code>
        </Link>
      </Box>
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight" noOfLines={1}>
          <ShowSolBalance balance={data?.balance?.balance} />
        </Box>
        {wallet?.id && (
          <ButtonGroup>
            <Button onClick={refreshWallet}>Refresh</Button>
            <Button onClick={requestAirdrop} disabled={airdropFetching}>
              Airdrop
            </Button>
            <Input
              value={amount}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target?.value))}
            />
          </ButtonGroup>
        )}
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
    </Box>
  )
}
