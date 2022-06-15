import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { AdminWalletUiTable } from '@kin-kinetic/admin/wallet/ui'
import { useAdminDeleteWalletMutation, useAdminWalletsQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export default function AdminWalletFeatureList() {
  const toast = useToast()
  const [{ data, error, fetching }, refresh] = useAdminWalletsQuery()
  const [, deleteWallet] = useAdminDeleteWalletMutation()

  const handleDelete = async (walletId: string) => {
    if (!window.confirm(`Are you sure?`)) return
    const res = await deleteWallet({ walletId })
    if (res.data?.deleted) {
      toast({
        title: 'Wallet deleted',
        description: `Public key: ${res.data.deleted?.publicKey}`,
      })
    }
    if (res?.error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = (res.error.graphQLErrors[0]?.extensions as any)?.response.message ?? [
        res.error?.message?.toString(),
      ]
      for (const error of errors) {
        toast({
          status: 'error',
          title: 'Wallet delete failed',
          description: error,
        })
      }
    }
    await refresh()
  }

  if (error) {
    toast({ status: 'error', title: 'Something went wrong', description: `${error}` })
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          Wallets
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px auto">
        {fetching && !data?.items?.length ? (
          <AdminUiLoader />
        ) : (
          <div>
            <AdminWalletUiTable wallets={data?.items} deleteWallet={handleDelete} />
          </div>
        )}
      </Box>
    </Stack>
  )
}
