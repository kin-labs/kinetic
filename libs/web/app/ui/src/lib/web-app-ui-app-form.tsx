import { Box, Stack, Text } from '@chakra-ui/react'
import { App } from '@kin-kinetic/web/util/admin-sdk'
import { Divider, Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'

export function WebAppUiAppForm({ app, onSubmit }: { app: App; onSubmit: (value: App) => void }) {
  return (
    <Form defaultValues={{ ...app }} onSubmit={onSubmit}>
      <FormLayout>
        <Stack p={4} spacing={6}>
          <Box>
            <Stack spacing={6}>
              <Text fontWeight="semibold" fontSize="xl">
                Basic Information
              </Text>
              <Field name="name" label="App name" type="text" help="The name of this app" rules={{ required: true }} />
              <Field
                name="logoUrl"
                label="App avatar"
                type="text"
                help="The url to the avatar of this app"
                rules={{ required: true }}
              />

              <Field
                name="index"
                label="App Index"
                type="number"
                isDisabled
                help="It's not possible to change this index once it's assigned"
                rules={{ required: true }}
              />
              <Divider />

              <Text fontWeight="semibold" fontSize="xl">
                Limitations
              </Text>

              <Field
                name="maxEnvs"
                label="Maximum number of environments"
                type="number"
                isDisabled
                help="The number of environments you can create is limited. Contact your administrator if you like to increase this number."
                rules={{ required: true }}
              />
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
