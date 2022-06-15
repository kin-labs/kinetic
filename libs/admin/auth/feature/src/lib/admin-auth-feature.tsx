import { Flex } from '@chakra-ui/react'
import { useAdminAuth } from '@kin-kinetic/admin/auth/data-access'
import { AdminAuthLoginForm } from '@kin-kinetic/admin/auth/ui'

export function AdminAuthFeature() {
  const { login } = useAdminAuth()
  return (
    <Flex h="full" justifyContent={'center'} alignItems={'center'}>
      <AdminAuthLoginForm login={login} />
    </Flex>
  )
}
