import { Flex } from '@chakra-ui/react'
import { useAdminAuth } from '@mogami/admin/auth/data-access'
import { AdminAuthLoginForm } from '@mogami/admin/auth/ui'

export default function AdminAuthFeature() {
  const { login } = useAdminAuth()
  return (
    <Flex h="full" justifyContent={'center'} alignItems={'center'}>
      <AdminAuthLoginForm login={login} />
    </Flex>
  )
}
