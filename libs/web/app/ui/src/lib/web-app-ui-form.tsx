import { Stack } from '@chakra-ui/react'
import { AdminAppCreateInput } from '@kin-kinetic/web/util/admin-sdk'
import { Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'

export function WebAppUiForm({
  data,
  onSubmit,
}: {
  data: { name: string; index: number }
  onSubmit: (value: AdminAppCreateInput) => void
}) {
  return (
    <Form defaultValues={{ ...data }} onSubmit={onSubmit}>
      <FormLayout>
        <Stack spacing={6}>
          <Field name="name" label="Name" type="text" help="The name of this app" rules={{ required: true }} />

          <Field
            name="index"
            label="App Index"
            type="number"
            help="Use the App Index provided by the Kin Foundation"
            rules={{ required: true }}
          />
        </Stack>

        <SubmitButton variant="solid" colorScheme="gray">
          Create
        </SubmitButton>
      </FormLayout>
    </Form>
  )
}
