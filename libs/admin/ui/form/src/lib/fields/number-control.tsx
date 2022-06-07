import { FormControl, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { ErrorWrapper } from './error-wrapper'

export function NumberControl({ disabled, label, name }: { disabled?: boolean; label: string; name: string }) {
  const { input, meta } = useField(name)
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return (
    <FormControl isInvalid={error && touched} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput {...input} isInvalid={meta['error'] && meta['touched']} id={name}>
        <NumberInputField disabled={disabled} placeholder={label} />
      </NumberInput>
      <ErrorWrapper name={name} />
    </FormControl>
  )
}
