import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/web/util/sdk'
import { Field } from '@saas-ui/react'
import { ChangeEvent } from 'react'
import * as Yup from 'yup'
import { WebWebhookUiForm } from './web-webhook-ui-form'

export function WebWebhookUiEventForm({
  env,
  onSubmit,
}: {
  env: AppEnv
  onSubmit: (input: UserAppEnvUpdateInput) => Promise<unknown>
}) {
  const schema = Yup.object().shape({
    webhookEventEnabled: Yup.boolean().label('Event webhook enabled').notRequired(),
    webhookEventUrl: Yup.string().label('Event webhook url').notRequired(),
  })

  return (
    <WebWebhookUiForm env={env} onSubmit={onSubmit} schema={schema} disabled={!env.webhookEventEnabled}>
      <Field
        type="switch"
        name="webhookEventEnabled"
        defaultChecked={env.webhookEventEnabled ?? false}
        label="Enable event webhook"
        help="When enabled, a webhook will be sent to the url specified below after a transaction finalized."
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSubmit({ webhookEventEnabled: e.target.checked })}
      />

      <Field
        isDisabled={!env.webhookEventEnabled}
        name="webhookEventUrl"
        label="Event webhook url"
        type="text"
        help="Url for receiving the event webhook."
        rules={{ required: false }}
      />
    </WebWebhookUiForm>
  )
}
