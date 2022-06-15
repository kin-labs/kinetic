import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@kin-kinetic/admin/ui/form'
import { ClusterTokenInput } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

import * as Yup from 'yup'

export interface AdminClusterUiProps {
  input: Partial<ClusterTokenInput>
  onSubmit: (input: Partial<ClusterTokenInput>) => unknown
}

const validationSchema = Yup.object({
  address: Yup.string(),
  name: Yup.string(),
  symbol: Yup.string(),
})

const fields: UiFormField[] = [
  UiFormField.input('address', { label: 'Address' }),
  UiFormField.input('name', { label: 'Name' }),
  UiFormField.input('symbol', { label: 'Symbol' }),
]

export function AdminClusterUiMintForm({ input, onSubmit }: AdminClusterUiProps) {
  return (
    <Stack display="block" direction="column" justify="normal" spacing={6}>
      <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
        <AdminUiForm
          data={{
            address: input.address,
            name: input.name,
            symbol: input.symbol,
          }}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      </Box>
    </Stack>
  )
}
