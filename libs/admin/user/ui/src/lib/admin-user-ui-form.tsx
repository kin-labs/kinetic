import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@kin-kinetic/admin/ui/form'
import { User, AdminUserUpdateInput } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

import * as Yup from 'yup'

export interface AdminUserUiProps {
  user?: User | null | undefined
  onSubmit: (input: AdminUserUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  avatarUrl: Yup.string().required(),
  name: Yup.string().required(),
})

const fields: UiFormField[] = [
  UiFormField.input('name', { label: 'Name' }),
  UiFormField.input('avatarUrl', { label: 'Avatar Url' }),
]

export function AdminUserUiForm({ user, onSubmit }: AdminUserUiProps) {
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          User Settings
        </Box>
        <AdminUiForm
          data={{
            name: user?.name,
            avatarUrl: user?.avatarUrl,
          }}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      </Stack>
    </Box>
  )
}
