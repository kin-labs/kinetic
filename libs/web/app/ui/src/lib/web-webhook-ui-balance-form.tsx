import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/web/util/sdk'
import { DisplayIf, Field, SwitchField } from '@saas-ui/react'
import * as Yup from 'yup'
import { WebWebhookUiForm } from './web-webhook-ui-form'

export function WebWebhookUiBalanceForm({
  env,
  onSubmit,
}: {
  env: AppEnv
  onSubmit: (input: UserAppEnvUpdateInput) => Promise<unknown>
}) {
  const schema = Yup.object().shape({
    webhookBalanceEnabled: Yup.boolean().label('Balance webhook enabled').notRequired(),
    webhookBalanceUrl: Yup.string().label('Balance webhook url').notRequired(),
    webhookBalanceThreshold: Yup.string().label('Balance webhook threshold').notRequired(),
  })

  return (
    <WebWebhookUiForm env={{ ...env }} onSubmit={onSubmit} schema={schema} title="Balance webhook">
      <SwitchField
        defaultChecked={env.webhookBalanceEnabled ?? false}
        name="webhookBalanceEnabled"
        label="Enable balance webhook"
        help="When enabled, a webhook will be sent to the url specified below when the balance of the account is below the threshold."
      />
      <DisplayIf name="webhookBalanceEnabled" condition={(enabled) => !!enabled}>
        <>
          <Field
            name="webhookBalanceUrl"
            label="Balance webhook url"
            type="text"
            help="Url for receiving the balance webhook."
            rules={{ required: false }}
          />
          <Field
            name="webhookBalanceThreshold"
            label="Balance webhook threshold"
            type="text"
            help="Receiving the balance webhook when the balance gets below this threshold."
            rules={{ required: false }}
          />
        </>
      </DisplayIf>
    </WebWebhookUiForm>
  )
}
