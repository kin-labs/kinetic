import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { ErrorWrapper } from './error-wrapper'

export function InputControl({ disabled, label, name }: { disabled?: boolean; label: string; name: string }) {
  const { input, meta } = useField(name)
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return (
    <FormControl isInvalid={error && touched} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...input}
        isInvalid={meta['error'] && meta['touched']}
        id={name}
        placeholder={label}
        disabled={disabled}
      />
      <ErrorWrapper name={name} />
    </FormControl>
  )
}
