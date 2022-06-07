import { Checkbox } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { useField } from 'react-final-form'

export function CheckboxArrayControl({ name, value, children }: PropsWithChildren<{ name: any; value: any }>) {
  const {
    input: { checked, ...input },
    meta: { error, touched },
  } = useField(name, {
    type: 'checkbox', // important for RFF to manage the checked prop
    value, // important for RFF to manage list of strings
  })
  return (
    <Checkbox {...input} isChecked={checked} isInvalid={error && touched}>
      {children}
    </Checkbox>
  )
}
