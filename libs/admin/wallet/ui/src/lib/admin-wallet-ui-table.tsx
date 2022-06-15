import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { ShowSolBalance } from '@kin-kinetic/admin/app/ui'
import { Wallet } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminWalletUiTableProps {
  wallets: Wallet[] | null | undefined
  deleteWallet: (walletId: string) => void
}

export function AdminWalletUiTable({ wallets, deleteWallet }: AdminWalletUiTableProps) {
  return (
    <Stack spacing={6} p={6} justifyContent={'center'}>
      {wallets?.map((wallet) => (
        <Stack direction="column" spacing={6} key={wallet.id}>
          <Flex p={6} borderWidth="1px" borderRadius="lg" justifyContent="space-between" alignItems="center">
            <Link to={'/system/wallets/' + wallet.id}>
              <Text fontSize="2xl" color="gray.500">
                {wallet.publicKey}
              </Text>
            </Link>
            <Button disabled={Boolean(wallet.appEnvs?.length)} size="xs" onClick={() => deleteWallet(wallet.id)}>
              Delete Wallet
            </Button>
          </Flex>
          <Stack spacing={6} borderWidth="1px" borderRadius="lg" p={6} justifyContent={'center'}>
            {wallet?.balances?.map((balance) => (
              <Stack direction="column" spacing={6} key={balance?.id}>
                <Text fontSize="3xl">
                  <ShowSolBalance balance={balance.balance}></ShowSolBalance>
                </Text>
                <Flex justifyContent="space-between" alignItems="center">
                  <Link to={`/apps/${balance?.appEnv?.app?.id}/environments/${balance?.appEnv?.id}`}>
                    <Text fontSize="2xl" color="gray.500">
                      {balance?.appEnv?.app?.name}
                    </Text>
                    <Text fontSize="3xl" color="teal.500">
                      {balance?.appEnv?.key}
                    </Text>
                  </Link>
                </Flex>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
