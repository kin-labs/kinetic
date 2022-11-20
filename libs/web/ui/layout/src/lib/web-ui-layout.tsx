import { Flex, useColorModeValue } from '@chakra-ui/react'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { AppShell } from '@saas-ui/app-shell'
import { ReactNode, Suspense } from 'react'
import { WebUiLayoutFooter } from './web-ui-layout-footer'
import { WebUiLayoutHeader } from './web-ui-layout-header'
import { WebUiLayoutProvider } from './web-ui-layout-provider'

export function WebUiLayout({ children }: { children: ReactNode }) {
  const bg = useColorModeValue('white', 'gray.900')
  return (
    <WebUiLayoutProvider>
      <AppShell navbar={<WebUiLayoutHeader />} footer={<WebUiLayoutFooter />} bg={bg}>
        <Flex direction="column" h="full" overflow="auto">
          <Suspense fallback={<WebUiLoader />}>{children}</Suspense>
        </Flex>
      </AppShell>
    </WebUiLayoutProvider>
  )
}
