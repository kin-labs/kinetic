import { UiFormField } from './ui-form-field'
import { ObjectSchema } from 'yup'

export interface AdminUiFormProps {
  data: Record<string, any>
  debug?: boolean
  fields: UiFormField[]
  onSubmit: (values: Record<string, string>) => void
  validationSchema?: ObjectSchema<any>
}
