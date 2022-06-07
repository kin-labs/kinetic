import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@mogami/admin/ui/form'
import { AppEnv, AppEnvUpdateInput } from '@mogami/shared/util/admin-sdk'
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

const fields: UiFormField[] = [
  UiFormField.checkbox('webhookEventEnabled', { label: 'Event webhook enabled' }),
  UiFormField.input('webhookEventUrl', {
    label: 'Event webhook url',
    hideExpression: (d) => !d['webhookEventEnabled'],
  }),
  UiFormField.checkbox('webhookVerifyEnabled', { label: 'Verify webhook enabled' }),
  UiFormField.input('webhookVerifyUrl', {
    label: 'Verify webhook url',
    hideExpression: (d) => !d['webhookVerifyEnabled'],
  }),
  UiFormField.input('webhookSecret', {
    label: 'Webhook secret',
    hideExpression: (d) => !d['webhookEventEnabled'] && !d['webhookVerifyEnabled'],
  }),
  UiFormField.checkbox('webhookAcceptIncoming', { label: 'Accept incoming webhooks' }),
]

export function AdminAppUiAppEnvWebhookForm({ appEnv, onSubmit }: AdminAppUiAppEnvWebhookFormProps) {
  const baseUrl = `http://local.mogami.io:3000/api/app/${appEnv.name}/${appEnv.app?.index}/webhook`
  const webhookEventUrl = appEnv?.webhookEventUrl || `${baseUrl}/event`
  const webhookVerifyUrl = appEnv?.webhookVerifyUrl || `${baseUrl}/verify`
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
          Webhook Settings
        </Box>
        <AdminUiForm
          data={{
            webhookAcceptIncoming: appEnv?.webhookAcceptIncoming,
            webhookEventEnabled: appEnv?.webhookEventEnabled,
            webhookEventUrl,
            webhookSecret: appEnv?.webhookSecret || 'hunter2',
            webhookVerifyEnabled: appEnv?.webhookVerifyEnabled,
            webhookVerifyUrl,
          }}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      </Stack>
    </Box>
  )
}
