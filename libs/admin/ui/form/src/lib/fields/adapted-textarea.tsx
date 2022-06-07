import { Textarea } from '@chakra-ui/react'
import React from 'react'

export function AdaptedTextarea({ input, meta, ...rest }: { meta: any; input: any }) {
  return <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
}
