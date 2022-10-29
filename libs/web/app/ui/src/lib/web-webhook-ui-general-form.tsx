import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/web/util/admin-sdk'
import { SwitchField } from '@saas-ui/react'
import * as Yup from 'yup'
import { WebWebhookUiForm } from './web-webhook-ui-form'

export function WebWebhookUiGeneralForm({
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
    <WebWebhookUiForm env={{ ...env }} onSubmit={onSubmit} schema={schema} title="General webhook settings">
      <SwitchField
        defaultChecked={env.webhookDebugging ?? false}
        name="webhookDebugging"
        label="Enable webhook debugging"
        help="When enabled, all webhooks will be shown in the transaction details page"
      />
    </WebWebhookUiForm>
  )
}
