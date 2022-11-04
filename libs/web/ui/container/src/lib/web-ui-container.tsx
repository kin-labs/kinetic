import { Container, Flex, forwardRef, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface WebUiContainerOptions {
  children?: ReactNode
}

export interface WebUiContainerProps extends HTMLChakraProps<'div'>, WebUiContainerOptions {}

export const WebUiContainer = forwardRef<WebUiContainerProps, 'div'>(function WebUiContainer(props, ref) {
  const { children, ...rest } = props

  const styles = {}

  return (
    <Flex px={{ base: 0, lg: 4 }} py={{ base: 4, lg: 8 }} ref={ref} __css={styles} {...rest}>
      <Container maxW="container.xl" h="full">
        {children}
      </Container>
    </Flex>
  )
})

WebUiContainer.displayName = 'WebUiContainer'
