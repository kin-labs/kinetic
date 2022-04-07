import { Alert, Box, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { AppUser, AppUserRole } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { AdminAppUiUserModal } from './admin-app-ui-user-modal'

export interface AdminAppUiUsersProps {
  updateRole: ({ role, appUserId }: { role: AppUserRole; appUserId: string }) => void
  users: AppUser[] | null | undefined
}

export function AdminAppUiUsers({ updateRole, users }: AdminAppUiUsersProps) {
  if (!users?.length) {
    return <Alert>No users found.</Alert>
  }
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
            {users?.map((user) => (
              <Tr key={user?.id}>
                <Td>
                  <Link to={'/users/' + user?.user?.id}>
                    <Text color="teal.500">
                      {user?.user?.name} ({user?.role})
                    </Text>
                  </Link>
                </Td>
                <Td isNumeric>
                  <AdminAppUiUserModal user={user} updateRole={updateRole} />
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
