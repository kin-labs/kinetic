import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { User } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminUserUiTableProps {
  users: User[] | null | undefined
  deleteUser: (userId: string) => void
}

export function AdminUserUiTable({ users, deleteUser }: AdminUserUiTableProps) {
  return (
    <Stack spacing={6} p={6} justifyContent={'center'}>
      {users?.map((user) => (
        <Stack direction="column" spacing={6} key={user.id}>
          <Flex p={6} borderWidth="1px" borderRadius="lg" justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              {user?.avatarUrl ? <Avatar mr={4} size={'lg'} src={user?.avatarUrl} /> : null}
              <Link to={'/system/users/' + user.id}>
                <Text fontSize="2xl" color="teal.500">
                  {user.name}
                </Text>
                <Text color="gray.500">{user?.role}</Text>
              </Link>
            </Flex>
            <Button size="xs" onClick={() => deleteUser(user.id)}>
              Delete
            </Button>
          </Flex>
        </Stack>
      ))}
    </Stack>
  )
}
