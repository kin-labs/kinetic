import { forwardRef, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { Card } from '@saas-ui/react'
import { ReactNode } from 'react'

export interface WebUiCardOptions {
  children?: ReactNode
}

export interface WebUiCardProps extends HTMLChakraProps<'div'>, WebUiCardOptions {}

export const WebUiCard = forwardRef<WebUiCardProps, 'div'>(function WebUiCard(props, ref) {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const { children, ...rest } = props

  const styles = {}

  return (
    <Card borderRadius={8} bg={bg} p={4} ref={ref} __css={styles} {...rest}>
      {children}
    </Card>
  )
})

WebUiCard.displayName = 'WebUiCard'
