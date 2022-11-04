import { Stack } from '@chakra-ui/react'
import { yupResolver } from '@saas-ui/forms/yup'
import { Button, ButtonGroup, Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import * as Yup from 'yup'

export function WebKeypairUiImport({ onSubmit }: { onSubmit: (value: { secret: string }) => void }) {
  const [values, setValues] = useState({ secret: '' })
  const schema = Yup.object().shape({
    secret: Yup.string().label('Secret'),
  })

  const submit = (values: { secret: string }) => {
    onSubmit(values)
    setValues(() => ({ secret: '' }))
  }

  return (
    <Form defaultValues={values} onSubmit={submit} resolver={yupResolver(schema, { stripUnknown: true })}>
      <FormLayout>
        <Stack p={4} borderWidth="1px" borderRadius="lg" spacing={6}>
          <Stack spacing={6}>
            <Field
              name="secret"
              label="Keypair Secret"
              type="string"
              help="You can use a mnemonic phrase, secret key in base58 format or a byte array."
            />
          </Stack>
          <ButtonGroup>
            <SubmitButton>Import</SubmitButton>
            <Button type="reset">Reset</Button>
          </ButtonGroup>
        </Stack>
      </FormLayout>
    </Form>
  )
}
