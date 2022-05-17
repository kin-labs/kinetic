import { Alert, Avatar, Box, Code, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Mint } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export interface AdminClusterUiMintsProps {
  clusterId: string
  mints: Mint[] | null | undefined
}

export function AdminClusterUiMints({ mints }: AdminClusterUiMintsProps) {
  if (!mints?.length) {
    return <Alert>No mints found.</Alert>
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th />
              <Th>Name</Th>
              <Th>Symbol</Th>
              <Th>Type</Th>
              <Th isNumeric>Decimals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mints?.map((mint) => (
              <Tr key={mint?.id}>
                <Td width={10}>
                  <Avatar src={mint!.logoUrl!} />
                </Td>
                <Td>{mint?.name}</Td>
                <Td>{mint?.symbol}</Td>
                <Td>
                  <Code>{mint?.type}</Code>
                </Td>
                <Td isNumeric>{mint?.decimals}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
