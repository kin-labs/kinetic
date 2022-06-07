export interface UiFormFieldOptions {
  disabled?: boolean
  label?: string
  options?: { color?: string; value: string; label: string }[]
  hideExpression?: (m: Record<string, any>) => boolean
}
