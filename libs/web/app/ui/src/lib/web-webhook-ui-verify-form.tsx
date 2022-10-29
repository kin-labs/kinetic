import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/web/util/admin-sdk'
import { DisplayIf, Field } from '@saas-ui/react'
import * as Yup from 'yup'
import { WebWebhookUiForm } from './web-webhook-ui-form'

export function WebWebhookUiVerifyForm({
  env,
  onSubmit,
}: {
  env: AppEnv
  onSubmit: (input: UserAppEnvUpdateInput) => Promise<unknown>
}) {
  const schema = Yup.object().shape({
    webhookVerifyEnabled: Yup.boolean().label('Verify webhook enabled').notRequired(),
    webhookVerifyUrl: Yup.string().label('Verify webhook url').notRequired(),
  })

  return (
    <WebWebhookUiForm env={env} onSubmit={onSubmit} schema={schema} title="Verify webhook">
      <Field
        type="switch"
        name="webhookVerifyEnabled"
        defaultChecked={env.webhookVerifyEnabled ?? false}
        label="Enable verify webhook"
        help="When enabled, a webhook will be sent to the url specified below before a transaction which you can verify and either accept or deny."
      />
      <DisplayIf name="webhookVerifyEnabled" condition={(enabled) => !!enabled}>
        <Field
          name="webhookVerifyUrl"
          label="Verify webhook url"
          type="text"
          help="Url for receiving the verify webhook."
          rules={{ required: false }}
        />
      </DisplayIf>
    </WebWebhookUiForm>
  )
}
