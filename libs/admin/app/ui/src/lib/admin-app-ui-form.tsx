import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { App, AppUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, NumberInputControl, SubmitButton } from 'formik-chakra-ui'

import * as Yup from 'yup'

export interface AdminAppUiProps {
  app?: App | null | undefined
  onSubmit: (input: AppUpdateInput) => Promise<any>
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  index: Yup.number().required(),
  webhookEventUrl: Yup.string(),
  webhookSecret: Yup.string(),
  webhookVerifyUrl: Yup.string(),
})

export function AdminAppUiForm({ app, onSubmit }: AdminAppUiProps) {
  return (
    <Formik
      initialValues={{
        index: app?.index,
        name: app?.name,
        webhookEventUrl: app?.webhookEventUrl,
        webhookSecret: app?.webhookSecret,
        webhookVerifyUrl: app?.webhookVerifyUrl,
      }}
      onSubmit={(values) =>
        onSubmit({
          name: values.name,
          webhookEventUrl: values?.webhookEventUrl,
          webhookSecret: values?.webhookSecret,
          webhookVerifyUrl: values?.webhookVerifyUrl,
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box as="form" onSubmit={handleSubmit as any}>
          <Stack display="block" direction="column" justify="normal" spacing={6}>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Stack direction="column" spacing={6}>
                <NumberInputControl name="index" label="App Index" isDisabled />
                <InputControl name="name" label="App Name" />
              </Stack>
            </Box>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Stack direction="column" spacing={6}>
                <InputControl name="webhookSecret" label="Webhook Secret" />
                <InputControl name="webhookEventUrl" label="Webhook Event Url" />
                <InputControl name="webhookVerifyUrl" label="Webhook Verify Url" />
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
