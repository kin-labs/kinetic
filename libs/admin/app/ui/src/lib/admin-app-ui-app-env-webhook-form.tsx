import { Box, Stack } from '@chakra-ui/react'
import { AdminUiForm, UiFormField } from '@kin-kinetic/admin/ui/form'
import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

import * as Yup from 'yup'

export interface AdminAppUiAppEnvWebhookFormProps {
  appEnv: AppEnv
  onSubmit: (input: UserAppEnvUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  webhookBalanceEnabled: Yup.boolean().optional(),
  webhookBalanceUrl: Yup.string().optional(),
  webhookBalanceThreshold: Yup.number().optional(),
  webhookDebugging: Yup.boolean().optional(),
  webhookEventEnabled: Yup.boolean().optional(),
  webhookEventUrl: Yup.string().optional(),
  webhookSecret: Yup.string().optional(),
  webhookVerifyEnabled: Yup.boolean().optional(),
  webhookVerifyUrl: Yup.string().optional(),
})

const fields: UiFormField[] = [
  UiFormField.checkbox('webhookBalanceEnabled', { label: 'Balance webhook enabled' }),
  UiFormField.input('webhookBalanceUrl', {
    label: 'Balance webhook url',
    hideExpression: (d) => !d['webhookBalanceEnabled'],
  }),
  UiFormField.input('webhookBalanceThreshold', {
    label: 'Balance webhook threshold',
    hideExpression: (d) => !d['webhookBalanceEnabled'],
  }),
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
  UiFormField.checkbox('webhookDebugging', { label: 'Enable webhook debugging' }),
]

export function AdminAppUiAppEnvWebhookForm({ appEnv, onSubmit }: AdminAppUiAppEnvWebhookFormProps) {
  const baseUrl = `http://local.kinetic.host:3000/api/app/${appEnv.name}/${appEnv.app?.index}/webhook`
  const webhookBalanceUrl = appEnv?.webhookBalanceUrl || `${baseUrl}/balance`
  const webhookEventUrl = appEnv?.webhookEventUrl || `${baseUrl}/event`
  const webhookVerifyUrl = appEnv?.webhookVerifyUrl || `${baseUrl}/verify`
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          Webhook Settings
        </Box>
        <AdminUiForm
          data={{
            webhookBalanceEnabled: appEnv?.webhookBalanceEnabled,
            webhookBalanceUrl,
            webhookBalanceThreshold: appEnv?.webhookBalanceThreshold,
            webhookDebugging: appEnv?.webhookDebugging,
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
