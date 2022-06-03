import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { App, AppUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, NumberInputControl, SubmitButton } from 'formik-chakra-ui'
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

export function AdminAppUiForm({ app, onSubmit }: AdminAppUiProps) {
  return (
    <Formik
      initialValues={{
        index: app?.index,
        name: app?.name,
      }}
      onSubmit={(values) =>
        onSubmit({
          name: values.name,
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box as="form" onSubmit={handleSubmit as any}>
          <Stack display="block" direction="column" justify="normal" spacing={6}>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
                App Settings
              </Box>
              {Object.keys(errors).length > 0 ? (
                <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
                  {JSON.stringify(errors, null, 2)}
                </Box>
              ) : null}
              <Stack direction="column" spacing={6}>
                <NumberInputControl name="index" label="App Index" isDisabled />
                <InputControl name="name" label="App Name" />
              </Stack>
            </Box>
            <ButtonGroup>
              <SubmitButton isDisabled={!dirty}>Save</SubmitButton>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </Formik>
  )
}
