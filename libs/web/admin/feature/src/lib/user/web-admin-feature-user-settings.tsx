import { useToast } from '@chakra-ui/react'
import { WebAdminUiUserUpdateForm } from '@kin-kinetic/web/admin/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { useAdminUpdateUserMutation, User, AdminUserUpdateInput } from '@kin-kinetic/web/util/sdk'

export function WebAdminFeatureUserSettings({ user }: { user: User }) {
  const toast = useToast()
  const [, updateUser] = useAdminUpdateUserMutation()
  const submit = async (input: AdminUserUpdateInput) => {
    if (!user.id) return
    console.log({ input })
    updateUser({ input, userId: user.id })
      .then(() => toast({ status: 'success', title: 'User settings saved.' }))
      .catch((error) =>
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        }),
      )
  }

  if (!user) {
    return <WebUiAlert message={'User not found'} />
  }

  return <WebAdminUiUserUpdateForm user={user} onSubmit={submit} />
}
