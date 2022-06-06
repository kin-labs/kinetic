import { UiFormFieldOptions } from './ui-form-field-options'
import { UiFormFieldType } from './ui-form-field-type'

export class UiFormField {
  type!: UiFormFieldType
  name!: string
  options?: UiFormFieldOptions

  static field(type: UiFormFieldType, name: string, options: UiFormFieldOptions): UiFormField {
    return { type, name, options }
  }

  static checkbox(name: string, options: Omit<UiFormFieldOptions, 'options'>): UiFormField {
    return this.field(UiFormFieldType.Checkbox, name, options)
  }

  static checkboxGroup(name: string, options: UiFormFieldOptions): UiFormField {
    return this.field(UiFormFieldType.CheckboxGroup, name, options)
  }

  static input(name: string, options: Omit<UiFormFieldOptions, 'options'>): UiFormField {
    return this.field(UiFormFieldType.Input, name, options)
  }

  static number(name: string, options: Omit<UiFormFieldOptions, 'options'>): UiFormField {
    return this.field(UiFormFieldType.Number, name, options)
  }

  static progress() {
    return this.field(UiFormFieldType.Progress, '', {})
  }

  static radio(name: string, options: UiFormFieldOptions): UiFormField {
    return this.field(UiFormFieldType.Radio, name, options)
  }

  static textarea(name: string, options: Omit<UiFormFieldOptions, 'options'>): UiFormField {
    return this.field(UiFormFieldType.Textarea, name, options)
  }
}
