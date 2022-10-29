import { Box, Stack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { ReactNode } from 'react'
import { WebUiPage } from './web-ui-page'
import { WebUiPageBackButton } from './web-ui-page-back.button'
import { WebUiPageHeader } from './web-ui-page-header'

export function WebUiPageFull({ children, title, to }: { children: ReactNode; title: string; to?: string }) {
  const borderColor = useColorModeValue('gray.300', 'gray.700')

  return (
    <Stack>
      <Box p={4} borderBottom={'1px'} borderColor={borderColor}>
        <WebUiPageHeader actionLeft={<WebUiPageBackButton to={to} />} title={title} />
      </Box>
      <WebUiPage>{children}</WebUiPage>
    </Stack>
  )
}
