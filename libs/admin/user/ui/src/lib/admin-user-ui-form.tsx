import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { User, UserUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, ResetButton, SubmitButton } from 'formik-chakra-ui'

import * as Yup from 'yup'

export interface AdminUserUiProps {
  user?: User | null | undefined
  onSubmit: (input: UserUpdateInput) => Promise<any>
}

const validationSchema = Yup.object({
  avatarUrl: Yup.string().required(),
  name: Yup.string().required(),
})

export function AdminUserUiForm({ user, onSubmit }: AdminUserUiProps) {
  return (
    <Formik
      initialValues={{
        avatarUrl: user?.avatarUrl,
        name: user?.name,
      }}
      onSubmit={(values) =>
        onSubmit({
          avatarUrl: values.avatarUrl,
          name: values.name,
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box borderWidth="1px" rounded="lg" p={6} m="10px auto" as="form" onSubmit={handleSubmit as any}>
          <Stack direction="column" spacing={6}>
            <InputControl name="name" label="Name" />
            <InputControl name="avatarUrl" label="Avatar Url" />
            <ButtonGroup>
              <SubmitButton isDisabled={!dirty}>Submit</SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </Formik>
  )
}
