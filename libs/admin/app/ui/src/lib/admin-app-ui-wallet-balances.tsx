import { Box, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { useWalletBalancesQuery, Wallet } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { ShowSolBalance } from './show-sol-balance'

export interface AdminAppUiWalletBalancesProps {
  wallet: Wallet
}

export function AdminAppUiWalletBalances({ wallet }: AdminAppUiWalletBalancesProps) {
  const [{ data }] = useWalletBalancesQuery({
    variables: { walletId: wallet.id! },
  })

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {data?.balances?.map((balance) => (
              <Tr key={balance?.id}>
                <Td>{balance.createdAt}</Td>
                <Td isNumeric>
                  <ShowSolBalance balance={balance.balance}></ShowSolBalance>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th />
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}
