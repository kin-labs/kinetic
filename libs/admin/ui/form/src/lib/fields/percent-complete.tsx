import { Progress } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-final-form'

export function PercentComplete(props: any) {
  const form = useForm()
  const numFields = form.getRegisteredFields().length
  const errors = form?.getState().errors || {}
  const numErrors = Object.keys(errors)?.length
  return <Progress value={numFields === 0 ? 0 : ((numFields - numErrors) / numFields) * 100} {...props} />
}
