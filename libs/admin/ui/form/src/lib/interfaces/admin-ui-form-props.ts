import { UiFormField } from './ui-form-field'

export interface AdminUiFormProps {
  data?: Record<string, any>
  fields: UiFormField[]
  onSubmit: (values: Record<string, string>) => void
  onValidate: (values: Record<string, string>) => Record<string, string | undefined>
}
