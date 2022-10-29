import { Stack } from '@chakra-ui/react'
import { WebUiSettingsLink } from '@kin-kinetic/web/ui/link'
import { App } from '@kin-kinetic/web/util/admin-sdk'
import { WebAppUiAppItem } from './web-app-ui-app-item'

export function WebAppUiAppHeader({ app }: { app: App }) {
  return (
    <Stack alignItems="top" direction="row" justifyContent="space-between" pb={2} pt={3} px={4} w="full">
      <WebAppUiAppItem app={app} />
      <WebUiSettingsLink label="App settings" to={`/apps/${app?.settingsUrl}`} />
    </Stack>
  )
}
