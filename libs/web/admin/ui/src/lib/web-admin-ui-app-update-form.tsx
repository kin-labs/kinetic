import { Box, Stack } from '@chakra-ui/react'
import { AdminAppUpdateInput, App } from '@kin-kinetic/web/util/admin-sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebAdminUiAppUpdateForm({
  app,
  onSubmit,
}: {
  app: App
  onSubmit: (value: AdminAppUpdateInput) => void
}) {
  const schema = Yup.object().shape({
    index: Yup.number().integer().label('Index'),
    maxEnvs: Yup.number().integer().label('Maximum Envs'),
    logoUrl: Yup.string().label('Logo URL'),
    name: Yup.string().required().label('Name'),
  })

  return (
    <Form defaultValues={{ ...app }} onSubmit={onSubmit} resolver={yupResolver(schema, { stripUnknown: true })}>
      <FormLayout>
        <Stack p={4} spacing={6}>
          <Box>
            <Stack spacing={6}>
              <Field name="index" label="Index" type="number" rules={{ required: true }} />
              <Field name="name" label="Name" type="string" rules={{ required: true }} />
              <Field name="logoUrl" label="Logo URL" type="string" />
              <Field name="maxEnvs" label="Maximum number of envs" type="number" rules={{ required: true }} />
            </Stack>
          </Box>
          <Box>
            <SubmitButton variant="solid">Save</SubmitButton>
          </Box>
        </Stack>
      </FormLayout>
    </Form>
  )
}
