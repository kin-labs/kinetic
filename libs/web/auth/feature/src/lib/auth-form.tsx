import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import * as React from 'react'

import { PasswordForm, PasswordFormProps } from './password-form'

export const AuthForm: React.FC<PasswordFormProps> = (props) => {
  const { ...formProps } = props

  return (
    <AuthFormContainer>
      <PasswordForm {...formProps} />
    </AuthFormContainer>
  )
}

export interface AuthFormContainerProps extends HTMLChakraProps<'div'>, ThemingProps<'AuthForm'> {}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('AuthForm', props)

  const containerProps = omitThemingProps(props)

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 'full',
    ...styles['container'],
  }

  return (
    <chakra.div __css={containerStyles} {...containerProps} className={cx('saas-auth-form', props.className)}>
      {children}
    </chakra.div>
  )
}
