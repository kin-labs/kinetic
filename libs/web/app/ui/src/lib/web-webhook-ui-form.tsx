import { Box, Heading, Stack } from '@chakra-ui/react'
import { AppEnv, UserAppEnvUpdateInput } from '@kin-kinetic/web/util/sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { FieldValues, Form, FormLayout, SubmitButton } from '@saas-ui/react'
import { ReactNode } from 'react'
import { ObjectSchema } from 'yup'

export function WebWebhookUiForm({
  children,
  env,
  onSubmit,
  schema,
  title,
}: {
  children: ReactNode
  env: AppEnv
  onSubmit: (input: UserAppEnvUpdateInput) => Promise<unknown>
  schema: ObjectSchema<FieldValues>
  title: string
}) {
  return (
    <Form
      defaultValues={{ ...env }}
      resolver={yupResolver(schema, { stripUnknown: true })}
      onSubmit={(res) => onSubmit(res as UserAppEnvUpdateInput)}
    >
      <FormLayout>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Heading size="md">{title}</Heading>
          {children}
          <Box>
            <SubmitButton>Save</SubmitButton>
          </Box>
        </Stack>
      </FormLayout>
    </Form>
  )
}
