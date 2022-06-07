import { FormControl } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'

export function ControlWrapper({ name, ...rest }: any) {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return <FormControl {...rest} isInvalid={error && touched} />
}
