import { Box, Button, ButtonGroup, Code, Input, Stack } from '@chakra-ui/react'
import { useWalletAirdropQuery, useWalletBalanceQuery, Wallet } from '@mogami/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'
import { ShowSolBalance } from './show-sol-balance'

export interface AdminAppUiWalletProps {
  wallet: Wallet
}

export function AdminAppUiWallet({ wallet }: AdminAppUiWalletProps) {
  const [amount, setAmount] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data }, refreshWallet] = useWalletBalanceQuery({ variables: { walletId: wallet.id! } })
  const [{ data: airdropData, error: airdropError, fetching: airdropFetching }, requestAirdropMutation] =
    useWalletAirdropQuery({
      variables: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        walletId: wallet.id!,
        amount,
      },
      pause: true,
    })

  const requestAirdrop = async () => {
    requestAirdropMutation()
    await refreshWallet()
  }

  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Box mt="1" isTruncated>
        <Code colorScheme="teal">{wallet?.publicKey}</Code>
      </Box>
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight" isTruncated>
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
