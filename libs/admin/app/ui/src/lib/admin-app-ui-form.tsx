import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { App, AppUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, NumberInputControl, ResetButton, SubmitButton } from 'formik-chakra-ui'

import * as Yup from 'yup'

export interface AdminAppUiProps {
  app?: App | null | undefined
  onSubmit: (input: AppUpdateInput) => Promise<any>
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  index: Yup.number().required(),
})

export function AdminAppUiForm({ app, onSubmit }: AdminAppUiProps) {
  return (
    <Formik
      initialValues={{ index: app?.index, name: app?.name }}
      onSubmit={(values) => onSubmit({ name: values.name })}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box borderWidth="1px" rounded="lg" p={6} m="10px auto" as="form" onSubmit={handleSubmit as any}>
          <Stack direction="column" spacing={6}>
            <NumberInputControl name="index" label="App Index" isDisabled />
            <InputControl name="name" label="App Name" />
            <ButtonGroup>
              <SubmitButton isDisabled={!dirty}>Submit</SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </Formik>
  )
}
