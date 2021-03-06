import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useUserWalletBalancesQuery, Wallet } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'
import { ShowSolBalance } from './show-sol-balance'

export interface AdminAppUiWalletBalancesProps {
  appEnvId: string
  wallet: Wallet
}

export function AdminAppUiWalletBalances({ appEnvId, wallet }: AdminAppUiWalletBalancesProps) {
  const [{ data }] = useUserWalletBalancesQuery({
    variables: {
      appEnvId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      walletId: wallet.id!,
    },
  })

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Balance</Th>
              <Th isNumeric>Change</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.balances?.map((balance) => (
              <Tr key={balance?.id}>
                <Td>{balance.createdAt}</Td>
                <Td isNumeric>
                  <ShowSolBalance balance={balance.balance}></ShowSolBalance>
                </Td>
                <Td isNumeric>
                  <ShowSolBalance balance={balance.change}></ShowSolBalance>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
