import { yupForm } from '@saas-ui/forms/yup'
import { AutoForm, FieldValues, UseFormReturn } from '@saas-ui/react'
import { useRef } from 'react'
import { DeepPartial } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'

type FormInstance<T> = UseFormReturn<FieldValues, T>

export function WebUiForm<T>({
  data,
  onSubmit,
  schema,
  submitLabel = 'Submit',
}: {
  data?: DeepPartial<T>
  onSubmit: (data: FieldValues) => void
  schema: AnyObjectSchema
  submitLabel?: string
}) {
  const ref = useRef<FormInstance<T>>(null)
  return (
    <AutoForm
      ref={ref}
      submitLabel={submitLabel}
      defaultValues={data}
      onSubmit={(data: FieldValues) => {
        onSubmit(data)
        ref?.current?.reset()
      }}
      {...yupForm(schema)}
    />
  )
}
