import { Box, Button, Stack, useToast } from '@chakra-ui/react'
import { WebAdminUiUserUpdateForm } from '@kin-kinetic/web/admin/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import {
  useAdminUpdateUserMutation,
  User,
  AdminUserUpdateInput,
  useAdminDeleteUserMutation,
} from '@kin-kinetic/web/util/sdk'
import { useNavigate } from 'react-router-dom'

export function WebAdminFeatureUserSettings({ user }: { user: User }) {
  const toast = useToast()
  const navigate = useNavigate()
  const [, updateUser] = useAdminUpdateUserMutation()
  const [, deleteUser] = useAdminDeleteUserMutation()

  const handleSubmit = async (input: AdminUserUpdateInput) => {
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser({ userId: user.id || '' })
        .then(() => {
          toast({ status: 'success', title: 'User deleted.' })
          navigate('/admin/users')
        })
        .catch((error) =>
          toast({
            status: 'error',
            title: 'Something went wrong',
            description: `${error}`,
          }),
        )
    }
  }

  if (!user) {
    return <WebUiAlert message={'User not found'} />
  }

  return (
    <Stack spacing={12}>
      <WebAdminUiUserUpdateForm user={user} onSubmit={handleSubmit} />
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Button variant={'solid'} colorScheme="red" onClick={handleDelete}>
          Delete User
        </Button>
      </Box>
    </Stack>
  )
}
