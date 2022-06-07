import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { Field, useField } from 'react-final-form'
import { AdaptedTextarea } from './adapted-textarea'
import { ErrorWrapper } from './error-wrapper'

export function TextareaControl({ name, label }: { name: string; label: string }) {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return (
    <FormControl isInvalid={error && touched} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name} component={AdaptedTextarea} placeholder={label} id={name} />
      <ErrorWrapper name={name} />
    </FormControl>
  )
}
