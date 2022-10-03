import { Flex, useToast } from '@chakra-ui/react'
import { useAdminAuth } from '@kin-kinetic/admin/auth/data-access'
import { AdminAuthLoginForm } from '@kin-kinetic/admin/auth/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useAdminConfigQuery } from '@kin-kinetic/shared/util/admin-sdk'

export function AdminAuthFeature() {
  const toast = useToast()
  const { login } = useAdminAuth()
  const [{ data, error, fetching }] = useAdminConfigQuery()

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Flex h="full" justifyContent={'center'} alignItems={'center'}>
      {data && (
        <AdminAuthLoginForm
          discordEnabled={data?.adminConfig.discordEnabled}
          githubEnabled={data?.adminConfig.githubEnabled}
          passwordEnabled={data?.adminConfig.passwordEnabled}
          login={login}
        />
      )}
    </Flex>
  )
}
