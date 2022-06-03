import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { AppEnv, AppEnvUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { CheckboxSingleControl, InputControl, SubmitButton } from 'formik-chakra-ui'
import React from 'react'

import * as Yup from 'yup'

export interface AdminAppUiAppEnvWebhookFormProps {
  appEnv: AppEnv
  onSubmit: (input: AppEnvUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  webhookAcceptIncoming: Yup.boolean().optional(),
  webhookEventEnabled: Yup.boolean().optional(),
  webhookEventUrl: Yup.string().optional(),
  webhookSecret: Yup.string().optional(),
  webhookVerifyEnabled: Yup.boolean().optional(),
  webhookVerifyUrl: Yup.string().optional(),
})

export function AdminAppUiAppEnvWebhookForm({ appEnv, onSubmit }: AdminAppUiAppEnvWebhookFormProps) {
  const baseUrl = `http://local.mogami.io:3000/api/app/${appEnv.name}/${appEnv.app?.index}/webhook`
  const webhookEventUrl = appEnv?.webhookEventUrl || `${baseUrl}/event`
  const webhookVerifyUrl = appEnv?.webhookVerifyUrl || `${baseUrl}/verify`
  return (
    <Formik
      initialValues={{
        webhookAcceptIncoming: appEnv?.webhookAcceptIncoming,
        webhookEventEnabled: appEnv?.webhookEventEnabled,
        webhookEventUrl,
        webhookSecret: appEnv?.webhookSecret || 'hunter2',
        webhookVerifyEnabled: appEnv?.webhookVerifyEnabled,
        webhookVerifyUrl,
      }}
      onSubmit={(values) =>
        onSubmit({
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
          <Stack display="block" direction="column" justify="normal" spacing={6}>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Stack direction="column" spacing={6}>
                <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
                  Webhook Settings
                </Box>
                {Object.keys(errors).length > 0 ? (
                  <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
                    {JSON.stringify(errors, null, 2)}
                  </Box>
                ) : null}
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
