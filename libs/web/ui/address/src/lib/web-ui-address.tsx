// From https://github.com/saas-js/saas-ui/blob/main/packages/saas-ui-web3/src/address.tsx
// Copyright (c) 2021 Eelco Wiersma
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { FC } from 'react'

export interface WebUiAddressProps extends HTMLChakraProps<'span'> {
  address: string
  startLength?: number
  endLength?: number
}

export const WebUiAddress: FC<WebUiAddressProps> = (props) => {
  const { address, startLength = 6, endLength = 4, ...rest } = props
  const start = address.slice(0, startLength)
  const end = address.slice(address.length - endLength, address.length)

  return (
    <chakra.span {...rest} className={cx('saas-web3-address', props.className)}>
      {start}...{end}
    </chakra.span>
  )
}
