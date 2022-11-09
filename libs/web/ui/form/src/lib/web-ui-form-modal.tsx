import { UseDisclosureReturn } from '@chakra-ui/hooks'
import { useDisclosure } from '@chakra-ui/react'
import { yupForm } from '@saas-ui/forms/yup'
import { Button, FieldValues, FormDialog, UseFormReturn } from '@saas-ui/react'
import { useRef } from 'react'
import { DeepPartial } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'

type FormInstance<T> = UseFormReturn<FieldValues, T>

export function WebUiFormModal<T>({
  button = true,
  data,
  disclosure,
  onSubmit,
  schema,
  submitLabel = 'Submit',
  title,
}: {
  button?: boolean
  data?: DeepPartial<T>
  disclosure?: UseDisclosureReturn
  onSubmit: (data: FieldValues) => void
  schema: AnyObjectSchema
  submitLabel?: string
  title?: string
}) {
  disclosure = useDisclosure(disclosure)
  const ref = useRef<FormInstance<T>>(null)
  title = title || submitLabel
  return (
    <>
      {button && <Button onClick={() => disclosure?.onOpen()}>{title}</Button>}
      <FormDialog
        ref={ref}
        title={title}
        submitLabel={submitLabel}
        {...disclosure}
        defaultValues={data}
        onSubmit={(data: FieldValues) => {
          onSubmit(data)
          ref?.current?.reset()
          disclosure?.onClose()
        }}
        {...yupForm(schema, { stripUnknown: true })}
      />
    </>
  )
}
