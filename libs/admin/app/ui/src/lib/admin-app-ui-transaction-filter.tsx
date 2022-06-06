import { Box, Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { AppTransactionListInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, ResetButton, SubmitButton } from 'formik-chakra-ui'
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

export function AdminAppUiTransactionFilter({ input, onSubmit }: AdminAppUiTransactionFilterProps) {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <Formik
      initialValues={{
        referenceId: input?.referenceId,
        referenceType: input?.referenceType,
        signature: input?.signature,
        source: input?.source,
        status: input?.status,
      }}
      onSubmit={(values) =>
        onSubmit({
          referenceId: values?.referenceId,
          referenceType: values?.referenceType,
          signature: values?.signature,
          source: values?.source,
          status: values?.status,
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box as="form" onSubmit={handleSubmit as any}>
          <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
            <Stack display="block" direction="column" justify="normal" spacing={6}>
              <ButtonGroup>
                <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'} Filters</Button>
                <Button onClick={() => onSubmit({})}>Clear Filters</Button>
              </ButtonGroup>
              {visible ? (
                <>
                  {Object.keys(errors).length > 0 ? (
                    <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
                      {JSON.stringify(errors, null, 2)}
                    </Box>
                  ) : null}
                  <Stack direction="column" spacing={6}>
                    <InputControl name="referenceId" label="referenceId" />
                    <InputControl name="referenceType" label="referenceType" />
                    <InputControl name="signature" label="signature" />
                    <InputControl name="source" label="source" />
                    <InputControl name="status" label="status" />
                  </Stack>
                  <ButtonGroup>
                    <SubmitButton>Filter</SubmitButton>
                    <ResetButton>Reset</ResetButton>
                  </ButtonGroup>
                </>
              ) : null}
            </Stack>
          </Box>
        </Box>
      )}
    </Formik>
  )
}
