import { FormErrorMessage } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'

export function ErrorWrapper({ name }: { name: string }) {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } })
  return <FormErrorMessage>{error}</FormErrorMessage>
}
