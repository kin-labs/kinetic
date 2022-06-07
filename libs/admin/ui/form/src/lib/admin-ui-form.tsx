import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { setIn } from 'final-form'
import React from 'react'
import { Form } from 'react-final-form'
import { AdminUiFormProps } from './interfaces/admin-ui-form-props'
import { UiFormField } from './interfaces/ui-form-field'

import { renderField } from './render-field'

export function AdminUiForm({ data, debug, fields, onSubmit, validationSchema }: AdminUiFormProps) {
  data = data || {}
  const onValidate = async (data: Record<string, any>) => {
    if (!validationSchema) return null
    try {
      await validationSchema.validate(data, { abortEarly: false })
    } catch (err: any) {
      return err.inner.reduce(
        (formError: object, innerError: any) => setIn(formError, innerError.path, innerError.message),
        {},
      )
    }
  }

  return (
    <Form
      initialValues={data}
      onSubmit={onSubmit}
      validate={onValidate}
      render={({ handleSubmit, form, errors, submitting, pristine, values, valid }) => (
        <Box as="form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <RenderField key={field.name} values={values} field={field} />
          ))}
          <ButtonGroup spacing={4}>
            <Button disabled={!valid} isLoading={submitting} loadingText="Submitting" colorScheme="teal" type="submit">
              Submit
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => form.reset()}
              isDisabled={submitting || pristine}
            >
              Reset
            </Button>
          </ButtonGroup>
          {debug ? (
            <Box as="pre" my={10}>
              {JSON.stringify(errors, null, 2)}
              {JSON.stringify(values, null, 2)}
            </Box>
          ) : null}
        </Box>
      )}
    />
  )
}

function RenderField({ values, field }: { values: any; field: UiFormField }) {
  let hide = false
  if (field.options?.hideExpression) {
    hide = field.options?.hideExpression(values)
  }
  return hide ? <Box /> : <Box>{renderField(field.type, field.name, field.options)}</Box>
}
