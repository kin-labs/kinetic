import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@mogami/admin/ui/form'
import { Cluster, ClusterStatus, ClusterUpdateInput } from '@mogami/shared/util/admin-sdk'
import React from 'react'

import * as Yup from 'yup'

export interface AdminClusterUiProps {
  cluster?: Cluster | null | undefined
  onSubmit: (input: ClusterUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  enableStats: Yup.boolean(),
  endpoint: Yup.string(),
  name: Yup.string(),
  status: Yup.string(),
})

const fields: UiFormField[] = [
  UiFormField.input('type', { disabled: true, label: 'Type' }),
  UiFormField.input('name', { label: 'Name' }),
  UiFormField.input('endpoint', { label: 'Endpoint' }),
  UiFormField.radio('status', {
    label: 'Status',
    options: [...Object.keys(ClusterStatus).map((status) => ({ value: status, label: status }))],
  }),
  UiFormField.checkbox('enableStats', { label: 'Enable cluster stats' }),
]

export function AdminClusterUiForm({ cluster, onSubmit }: AdminClusterUiProps) {
  return (
    <Box borderWidth="1px" rounded="lg" p={6}>
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          Cluster settings
        </Box>
        <AdminUiForm
          data={{
            name: cluster?.name,
            enableStats: cluster?.enableStats,
            endpoint: cluster?.endpoint,
            type: cluster?.type,
            status: cluster?.status,
          }}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      </Stack>
    </Box>
  )
}
