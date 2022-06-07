import { FormLabel, Radio, Stack } from '@chakra-ui/react'
import React from 'react'
import { Field } from 'react-final-form'

import { AdaptedRadioGroup } from './fields/adapted-radio-group'
import { CheckboxArrayControl } from './fields/checkbox-array-control'
import { CheckboxControl } from './fields/checkbox-control'
import { ControlWrapper } from './fields/control-wrapper'
import { ErrorWrapper } from './fields/error-wrapper'
import { InputControl } from './fields/input-control'
import { NumberControl } from './fields/number-control'
import { PercentComplete } from './fields/percent-complete'
import { TextareaControl } from './fields/textarea-control'
import { UiFormFieldOptions } from './interfaces/ui-form-field-options'
import { UiFormFieldType } from './interfaces/ui-form-field-type'

export function renderField(
  type: UiFormFieldType,
  name: string,
  { disabled, label, options }: UiFormFieldOptions = {},
) {
  switch (type) {
    case UiFormFieldType.Checkbox:
      return <CheckboxControl name={name}>{label || ''}</CheckboxControl>
    case UiFormFieldType.CheckboxGroup:
      return (
        <ControlWrapper name={name} my={4}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Stack pl={6} mt={1} spacing={1}>
            {options?.map(({ color, label, value }) => (
              <CheckboxArrayControl name={name} key={value} value={value}>
                {label}
              </CheckboxArrayControl>
            ))}
          </Stack>
          <ErrorWrapper name={name} />
        </ControlWrapper>
      )
    case UiFormFieldType.Input:
      return <InputControl disabled={disabled} name={name} label={label || ''} />
    case UiFormFieldType.Number:
      return <NumberControl disabled={disabled} name={name} label={label || ''} />
    case UiFormFieldType.Progress:
      return <PercentComplete size="sm" my={5} hasStripe isAnimated />
    case UiFormFieldType.Radio:
      return (
        <Field name={name} label={label || ''} component={AdaptedRadioGroup}>
          {options?.map(({ color, label, value }) => (
            <Radio key={value} value={value} colorScheme={color}>
              {label}
            </Radio>
          ))}
        </Field>
      )
    case UiFormFieldType.Textarea:
      return <TextareaControl name={name} label={label || ''} />
    default:
      return <div>No such type.</div>
  }
}
