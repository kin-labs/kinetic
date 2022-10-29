import { Flex, useColorModeValue } from '@chakra-ui/react'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { ReactNode, Suspense } from 'react'
import { WebUiLayoutFooter } from './web-ui-layout-footer'
import { WebUiLayoutHeader } from './web-ui-layout-header'
import { WebUiLayoutProvider } from './web-ui-layout-provider'

export function WebUiLayout({ children }: { children: ReactNode }) {
  const bg = useColorModeValue('white', 'gray.900')
  return (
    <WebUiLayoutProvider>
      <Flex direction="column" h="full" bg={bg}>
        <WebUiLayoutHeader />
        <Flex direction="column" grow={1}>
          <Suspense fallback={<WebUiLoader />}>{children}</Suspense>
        </Flex>
        <WebUiLayoutFooter />
      </Flex>
    </WebUiLayoutProvider>
  )
}
