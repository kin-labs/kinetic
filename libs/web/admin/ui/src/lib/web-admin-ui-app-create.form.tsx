import { Box, Stack } from '@chakra-ui/react'
import { AdminAppCreateInput } from '@kin-kinetic/web/util/sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebAdminUiAppCreateForm({ onSubmit }: { onSubmit: (value: AdminAppCreateInput) => void }) {
  const schema = Yup.object().shape({
    index: Yup.number().integer().required().label('Index'),
    name: Yup.string().required().label('Name'),
    logoUrl: Yup.string().label('Logo URL'),
    skipWalletCreation: Yup.boolean().label('Skip Wallet Creation'),
  })

  return (
    <Form defaultValues={{}} onSubmit={onSubmit} resolver={yupResolver(schema, { stripUnknown: true })}>
      <FormLayout>
        <Stack p={4} spacing={6}>
          <Box>
            <Stack spacing={6}>
              <Field name="index" label="Index" type="number" rules={{ required: true }} />
              <Field name="name" label="Name" type="string" rules={{ required: true }} />
              <Field name="logoUrl" label="Logo URL" type="string" />
              <Field name="skipWalletCreation" label="Skip wallet creation" type="checkbox" />
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
