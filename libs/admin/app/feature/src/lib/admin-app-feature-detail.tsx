import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiForm } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { AppUpdateInput, useAppQuery, useUpdateAppMutation } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  const [{ data, fetching }] = useAppQuery({ variables: { appId } })
  const [_, updateAppMutation] = useUpdateAppMutation()

  const onSubmit = async (input: AppUpdateInput) => {
    const res = await updateAppMutation({ appId, input })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'App updated' })
    }
    return res?.data?.updated
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {data?.item?.name}
        </Box>
      </Box>

      <Box>{fetching ? <AdminUiLoader /> : <AdminAppUiForm app={data?.item} onSubmit={onSubmit} />}</Box>
    </Stack>
  )
}
