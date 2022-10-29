import { Box, Stack } from '@chakra-ui/react'
import { UserAppEnvUpdateInput } from '@kin-kinetic/web/util/sdk'
import { Field, Form, SubmitButton } from '@saas-ui/react'

export function WebAppUiEnvForm({
  data,
  onSubmit,
}: {
  data: { name: string; index: number }
  onSubmit: (value: UserAppEnvUpdateInput) => void
}) {
  return (
    <Form defaultValues={{ ...(data as UserAppEnvUpdateInput) }} onSubmit={onSubmit}>
      <Stack spacing={6}>
        <Field name="name" label="Name" type="text" help="The name of this environment" rules={{ required: true }} />
        <Box>
          <SubmitButton variant="solid" colorScheme="gray">
            Create Environment
          </SubmitButton>
        </Box>
      </Stack>
    </Form>
  )
}
