import { Checkbox, FormControl, FormErrorMessage } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { useField } from 'react-final-form'

export function CheckboxControl({ name, children }: PropsWithChildren<{ name: string }>) {
  const {
    input: { checked, ...input },
    meta: { error, touched, invalid },
  } = useField(name, {
    type: 'checkbox', // important for RFF to manage the checked prop
  })
  return (
    <FormControl isInvalid={touched && invalid} my={4}>
      <Checkbox {...input} isInvalid={touched && invalid} my={4}>
        {children}
      </Checkbox>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
