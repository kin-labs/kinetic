import { useWebAuth } from '@kin-kinetic/web/auth/data-access'

import { Field, FieldErrors, Form, FormLayout, FormProps, SubmitHandler } from '@saas-ui/forms'
import { Button } from '@saas-ui/react'
import * as React from 'react'

export interface SubmitParams {
  username: string
  password: string
  [key: string]: string
}

export interface PasswordFormProps extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver' | 'children'> {
  schema?: unknown
  onSuccess?: (data: unknown) => void
  onError?: (error: unknown) => void
  onValidationError?: (error: FieldErrors<SubmitParams>) => void
  submitLabel?: string
  usernameLabel?: string
  passwordLabel?: string
  defaultValues?: Record<string, string>
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel = 'Log in',
  usernameLabel = 'Username',
  passwordLabel = 'Password',
  defaultValues,
  ...formProps
}) => {
  const { login, loading } = useWebAuth()

  const handleSubmit: SubmitHandler<SubmitParams> = (params) => {
    return login(params).then(onSuccess).catch(onError)
  }

  return (
    <Form<SubmitParams>
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ username: '', password: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field name="username" label={usernameLabel} type="username" rules={{ required: true }} />
        <Field
          name="password"
          label={passwordLabel}
          type="password"
          rules={{ required: true }}
          autoComplete="current-password"
        />

        <Button type="submit" width="full" isLoading={loading}>
          {submitLabel}
        </Button>
      </FormLayout>
    </Form>
  )
}
