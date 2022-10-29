import { Avatar, Box, IconButton, Tag } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { AppUser, UserAppUserRemoveInput, UserAppUserUpdateRoleInput } from '@kin-kinetic/web/util/sdk'
import { List } from '@saas-ui/react'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { WebAppUiAppUserModal } from './web-app-ui-app-user-modal'

export interface AdminAppUiUsersProps {
  updateRole: ({ role, userId }: UserAppUserUpdateRoleInput) => void
  deleteAppUser: ({ userId }: UserAppUserRemoveInput) => void
  users: AppUser[] | null | undefined
}

export function WebAppUiAppUserList({ deleteAppUser, updateRole, users }: AdminAppUiUsersProps) {
  if (!users?.length) {
    return <WebUiAlert message={'This app has no users.'} />
  }
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <List
        items={[
          ...users.map((u) => ({
            primary: u?.user?.name,
            secondary: (
              <Tag size="sm" colorScheme="primary">
                {u?.role}
              </Tag>
            ),
            icon: <Avatar src={u?.user?.avatarUrl || ''} />,
            action: (
              <>
                <WebAppUiAppUserModal user={u} updateRole={updateRole} />
                <IconButton
                  aria-label={'Delete App User'}
                  icon={<MdDelete />}
                  onClick={() => {
                    deleteAppUser({ userId: u?.user?.id || '' })
                  }}
                >
                  Delete App User
                </IconButton>
              </>
            ),
          })),
        ]}
      />
    </Box>
  )
}
