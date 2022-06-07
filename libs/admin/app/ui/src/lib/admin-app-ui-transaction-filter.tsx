import { Box, Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@mogami/admin/ui/form'
import { AppTransactionListInput } from '@mogami/shared/util/admin-sdk'
import React, { useState } from 'react'

import * as Yup from 'yup'

export interface AdminAppUiTransactionFilterProps {
  input?: AppTransactionListInput | null | undefined
  onSubmit: (input: AppTransactionListInput) => void
}

const validationSchema = Yup.object({
  referenceId: Yup.string(),
  referenceType: Yup.string(),
  signature: Yup.string(),
  source: Yup.string(),
  status: Yup.string(),
})

const fields: UiFormField[] = [
  UiFormField.input('referenceId', { label: 'referenceId' }),
  UiFormField.input('referenceType', { label: 'referenceType' }),
  UiFormField.input('signature', { label: 'signature' }),
  UiFormField.input('source', { label: 'source' }),
  UiFormField.input('status', { label: 'status' }),
]
export function AdminAppUiTransactionFilter({ input, onSubmit }: AdminAppUiTransactionFilterProps) {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <Stack display="block" direction="column" justify="normal" spacing={6}>
      <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
        <ButtonGroup>
          <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'} Filters</Button>
          <Button onClick={() => onSubmit({})}>Clear Filters</Button>
        </ButtonGroup>
        {visible ? (
          <AdminUiForm
            data={{
              referenceId: input?.referenceId,
              referenceType: input?.referenceType,
              signature: input?.signature,
              source: input?.source,
              status: input?.status,
            }}
            fields={fields}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          />
        ) : null}
      </Box>
    </Stack>
  )
}
