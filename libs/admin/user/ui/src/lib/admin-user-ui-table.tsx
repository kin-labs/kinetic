import { Button, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { User } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminUserUiTableProps {
  users: User[] | null | undefined
  deleteUser: (userId: string) => void
}

export function AdminUserUiTable({ users, deleteUser }: AdminUserUiTableProps) {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Link to={'/users/' + user.id}>
                  <Text color="teal.500">{user.name}</Text>
                </Link>
              </Td>
              <Td isNumeric>
                <Button size="xs" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
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
  )
}
