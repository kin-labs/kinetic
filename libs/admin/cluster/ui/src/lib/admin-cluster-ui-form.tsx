import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@kin-kinetic/admin/ui/form'
import { Cluster, ClusterStatus, AdminClusterUpdateInput } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

import * as Yup from 'yup'

export interface AdminClusterUiProps {
  cluster?: Cluster | null | undefined
  onSubmit: (input: AdminClusterUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  enableStats: Yup.boolean(),
  endpoint: Yup.string(),
  explorer: Yup.string(),
  name: Yup.string(),
  status: Yup.string(),
})

const fields: UiFormField[] = [
  UiFormField.input('type', { disabled: true, label: 'Type' }),
  UiFormField.input('name', { label: 'Name' }),
  UiFormField.input('endpointPrivate', { label: 'Endpoint Private' }),
  UiFormField.input('endpointPublic', { label: 'Endpoint Public' }),
  UiFormField.input('explorer', { label: 'Explorer' }),
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
            endpointPrivate: cluster?.endpointPrivate,
            endpointPublic: cluster?.endpointPublic,
            explorer: cluster?.explorer,
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
