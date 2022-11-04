import { Divider, Stack } from '@chakra-ui/react'
import { App } from '@kin-kinetic/web/util/sdk'
import { WebAppUiAppHeader } from './web-app-ui-app-header'
import { WebAppUiEnvPicker } from './web-app-ui-env-picker'

export function WebAppUiAppGridItem({ app }: { app: App }) {
  return (
    <Stack w="full">
      <WebAppUiAppHeader app={app} />
      <Divider />
      <WebAppUiEnvPicker app={app} />
    </Stack>
  )
}
