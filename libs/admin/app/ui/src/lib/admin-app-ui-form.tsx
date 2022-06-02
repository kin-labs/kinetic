import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { App, AppUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { CheckboxSingleControl, InputControl, NumberInputControl, SubmitButton } from 'formik-chakra-ui'

import * as Yup from 'yup'

export interface AdminAppUiProps {
  app?: App | null | undefined
  onSubmit: (input: AppUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  index: Yup.number().required(),
  webhookAcceptIncoming: Yup.boolean().optional(),
  webhookEventEnabled: Yup.boolean().optional(),
  webhookEventUrl: Yup.string().optional(),
  webhookSecret: Yup.string(),
  webhookVerifyEnabled: Yup.boolean().optional(),
  webhookVerifyUrl: Yup.string(),
})

export function AdminAppUiForm({ app, onSubmit }: AdminAppUiProps) {
  return (
    <Formik
      initialValues={{
        index: app?.index,
        name: app?.name,
        webhookAcceptIncoming: app?.webhookAcceptIncoming,
        webhookEventEnabled: app?.webhookEventEnabled,
        webhookEventUrl: app?.webhookEventUrl,
        webhookSecret: app?.webhookSecret,
        webhookVerifyEnabled: app?.webhookVerifyEnabled,
        webhookVerifyUrl: app?.webhookVerifyUrl,
      }}
      onSubmit={(values) =>
        onSubmit({
          name: values.name,
          webhookAcceptIncoming: values?.webhookAcceptIncoming,
          webhookEventEnabled: values?.webhookEventEnabled,
          webhookEventUrl: values?.webhookEventUrl,
          webhookSecret: values?.webhookSecret,
          webhookVerifyEnabled: values?.webhookVerifyEnabled,
          webhookVerifyUrl: values?.webhookVerifyUrl,
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box as="form" onSubmit={handleSubmit as any}>
          {errors && (
            <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
              {JSON.stringify(errors, null, 2)}
            </Box>
          )}
          <Stack display="block" direction="column" justify="normal" spacing={6}>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Stack direction="column" spacing={6}>
                <NumberInputControl name="index" label="App Index" isDisabled />
                <InputControl name="name" label="App Name" />
              </Stack>
            </Box>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Stack direction="column" spacing={6}>
                <CheckboxSingleControl name="webhookEventEnabled" label="Event Webhook Enabled" />
                <InputControl
                  display={values.webhookEventEnabled ? 'block' : 'none'}
                  name="webhookEventUrl"
                  label="Event Webhook Url"
                />
                <CheckboxSingleControl name="webhookVerifyEnabled" label="Verify Webhook Enabled" />
                <InputControl
                  display={values.webhookVerifyEnabled ? 'block' : 'none'}
                  name="webhookVerifyUrl"
                  label="Verify Webhook Url"
                />
                <InputControl
                  display={values.webhookEventEnabled || values.webhookVerifyEnabled ? 'block' : 'none'}
                  name="webhookSecret"
                  label="Webhook Secret"
                />
                <CheckboxSingleControl name="webhookAcceptIncoming" label="Accept Incoming Webhooks" />
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
