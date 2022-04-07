import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { UserEmail } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export interface AdminUserUiEmailsProps {
  emails: UserEmail[] | null | undefined
}

export function AdminUserUiEmails({ emails }: AdminUserUiEmailsProps) {
  if (!emails?.length) {
    return <Alert>No emails found.</Alert>
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {emails?.map((email) => (
              <Tr key={email?.id}>
                <Td>
                  <Text color="teal.500">{email?.email}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Email</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}
