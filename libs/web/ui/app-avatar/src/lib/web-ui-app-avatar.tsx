import { Avatar, forwardRef, HTMLChakraProps } from '@chakra-ui/react'

export interface WebUiAppAvatarOptions {
  logoUrl?: string | null | undefined
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface WebUiAppAvatarProps extends HTMLChakraProps<'div'>, WebUiAppAvatarOptions {}

export const WebUiAppAvatar = forwardRef<WebUiAppAvatarProps, 'span'>(function WebUiAppAvatar(props, ref) {
  const { logoUrl, onError, size, ...rest } = props

  return (
    <Avatar
      bg="inherit"
      onError={() => console.log('Avatar could not be found.')}
      size={size}
      src={logoUrl || '/assets/kin-logo.svg'}
      ref={ref}
      {...rest}
    />
  )
})

WebUiAppAvatar.displayName = 'WebUiAppAvatar'
