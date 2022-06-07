import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@mogami/admin/ui/form'
import { App, AppUpdateInput } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import * as Yup from 'yup'

export interface AdminAppUiProps {
  app?: App | null | undefined
  onSubmit: (input: AppUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  index: Yup.number().required(),
})

const fields: UiFormField[] = [
  UiFormField.number('index', { disabled: true, label: 'App Index' }),
  UiFormField.input('name', { label: 'App Name' }),
]

export function AdminAppUiForm({ app, onSubmit }: AdminAppUiProps) {
  return (
    <Stack display="block" direction="column" justify="normal" spacing={6}>
      <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          App Settings
        </Box>
        <AdminUiForm
          data={{ index: app?.index, name: app?.name }}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      </Box>
    </Stack>
  )
}
