import { Stack, useToast } from '@chakra-ui/react'
import { WebAppUiAppUserList, WebAppUiAppUserModal } from '@kin-kinetic/web/app/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import {
  App,
  UserAppUserAddInput,
  UserAppUserRemoveInput,
  UserAppUserUpdateRoleInput,
  useUserAppUserAddMutation,
  useUserAppUserRemoveMutation,
  useUserAppUserUpdateRoleMutation,
} from '@kin-kinetic/web/util/sdk'
import { CardHeader, CardTitle } from '@saas-ui/react'

export function WebAppSettingsUsersTab({ app }: { app: App }) {
  const toast = useToast()
  const [, addAppUser] = useUserAppUserAddMutation()
  const [, removeAppUser] = useUserAppUserRemoveMutation()
  const [, updateAppUserRole] = useUserAppUserUpdateRoleMutation()

  const handleAddAppUser = (input: UserAppUserAddInput) => {
    addAppUser({ appId: app.id, input })
      .then(() => {
        toast({ status: 'success', title: 'App user added' })
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        })
      })
  }

  const handleRemoveAppUser = (input: UserAppUserRemoveInput) => {
    if (!window.confirm('Are you sure?')) return
    removeAppUser({ appId: app.id, input })
      .then(() => {
        toast({ status: 'success', title: 'App user removed' })
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        })
      })
  }

  const handleUpdateAppUserRole = (input: UserAppUserUpdateRoleInput) => {
    updateAppUserRole({ appId: app.id, input })
      .then(() => {
        toast({ status: 'success', title: 'App user role saved' })
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        })
      })
  }

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebUiCard>
        <CardHeader>
          <CardTitle fontSize="xl" mr={'2'}>
            Users
          </CardTitle>
          <WebAppUiAppUserModal addRole={handleAddAppUser} />
        </CardHeader>
      </WebUiCard>
      <WebAppUiAppUserList
        deleteAppUser={handleRemoveAppUser}
        users={app?.users}
        updateRole={handleUpdateAppUserRole}
      />
    </Stack>
  )
}
