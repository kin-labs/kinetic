import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import { Form } from 'react-final-form'
import { AdminUiFormProps } from './interfaces/admin-ui-form-props'

import { renderField } from './render-field'

export function AdminUiForm({ data, fields, onSubmit, onValidate }: AdminUiFormProps) {
  return (
    <Form
      initialValues={data || {}}
      onSubmit={onSubmit}
      validate={onValidate}
      render={({ handleSubmit, form, errors, submitting, pristine, values }) => (
        <Box as="form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Box key={field.name}>{renderField(field.type, field.name, field.options)}</Box>
          ))}
          <ButtonGroup spacing={4}>
            <Button isLoading={submitting} loadingText="Submitting" colorScheme="teal" type="submit">
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
          <Box as="pre" my={10}>
            {JSON.stringify(errors, null, 2)}
            {JSON.stringify(values, null, 2)}
          </Box>
        </Box>
      )}
    />
  )
}
