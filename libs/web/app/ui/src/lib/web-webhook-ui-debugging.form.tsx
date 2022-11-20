import { Stack, Text } from '@chakra-ui/react'
import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/web/util/sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { Form, SwitchField } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebWebhookUiDebuggingForm({
  env,
  onSubmit,
}: {
  env: AppEnv
  onSubmit: (input: UserAppEnvUpdateInput) => Promise<unknown>
}) {
  const schema = Yup.object().shape({
    webhookDebugging: Yup.boolean().label('Debugging webhook enabled'),
  })

  return (
    <Form
      defaultValues={{ webhookDebugging: env.webhookDebugging }}
      resolver={yupResolver(schema, { stripUnknown: true })}
      onSubmit={(res) => onSubmit({ webhookDebugging: res.webhookDebugging })}
      onChange={(res) => onSubmit({ webhookDebugging: res.webhookDebugging })}
    >
      <Stack direction="row">
        <Text whiteSpace="nowrap">Enable webhook debugging</Text>
        <SwitchField defaultChecked={env.webhookDebugging ?? false} name="webhookDebugging" />
      </Stack>
    </Form>
  )
}
