import { FormControl, FormErrorMessage, FormLabel, RadioGroup } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export function AdaptedRadioGroup({
  input,
  meta,
  label,
  children,
}: PropsWithChildren<{ input: any; meta: any; label: string }>) {
  return (
    <FormControl isInvalid={meta.touched && meta.invalid} my={4}>
      <FormLabel htmlFor={input.name}>{label}</FormLabel>
      <RadioGroup {...input}>{children}</RadioGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
