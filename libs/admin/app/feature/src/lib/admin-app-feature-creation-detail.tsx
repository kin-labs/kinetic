import { Box, Flex, Stack } from '@chakra-ui/react'
import { AdminAppUiCreationDetail, AdminAppUiCreationTimeline } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppCreationQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureCreationDetail() {
  const { appId, appCreationId } = useParams<{ appId: string; appCreationId: string }>()
  const [{ data, fetching }] = useAppCreationQuery({ variables: { appId, appCreationId } })

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            Creation {data?.item?.id}
          </Box>
        </Flex>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiCreationDetail item={data?.item} />}
      </Box>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiCreationTimeline item={data?.item} />}
      </Box>
    </Stack>
  )
}
