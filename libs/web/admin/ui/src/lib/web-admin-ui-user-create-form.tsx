import { Box, Stack } from '@chakra-ui/react'
import { AdminUserCreateInput, UserRole } from '@kin-kinetic/web/util/sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebAdminUiUserCreateForm({ onSubmit }: { onSubmit: (value: AdminUserCreateInput) => void }) {
  const schema = Yup.object().shape({
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().label('Password'),
    username: Yup.string().label('Username'),
    name: Yup.string().label('Name'),
    avatarUrl: Yup.string().label('Avatar Url'),
    role: Yup.string().label('Role'),
  })

  return (
    <Form defaultValues={{}} onSubmit={onSubmit} resolver={yupResolver(schema, { stripUnknown: true })}>
      <FormLayout>
        <Stack p={4} spacing={6}>
          <Box>
            <Stack spacing={6}>
              <Field name="email" label="Email" type="email" rules={{ required: true }} />
              <Field name="password" label="Password" type="string" rules={{ required: true }} />
              <Field name="username" label="Username" type="string" />
              <Field name="name" label="Name" type="string" />
              <Field name="avatarUrl" label="Avatar URL" type="url" />
              <Field
                name="role"
                label="Role"
                type="radio"
                defaultValue={UserRole.User}
                options={Object.keys(UserRole).map((value) => ({ value }))}
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
