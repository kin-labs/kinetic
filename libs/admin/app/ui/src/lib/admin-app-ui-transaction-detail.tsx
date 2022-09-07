import { Code, Table, TableContainer, Tbody, Td, Th, Tr } from '@chakra-ui/react'
import { Transaction } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiTransactionDetail({ item }: { item: Transaction }) {
  const fields: { label: string; field: 'feePayer' | 'mint' | 'source' }[] = [
    { label: 'Fee Payer', field: 'feePayer' },
    { label: 'Mint', field: 'mint' },
    { label: 'Source', field: 'source' },
  ]
  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          {fields.map(({ field, label }) => (
            <Tr key={field}>
              <Th>{label}</Th>
              <Td>
                <Code>{item[field]}</Code>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
