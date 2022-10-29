import { Tag } from '@chakra-ui/react'
import { useWebServer } from '@kin-kinetic/web/server/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { List } from '@saas-ui/react'

export function WebServerUiSelector() {
  const { servers, selectServer } = useWebServer()

  if (!servers?.length) {
    return <WebUiAlert status={'warning'} message="No servers found" />
  }
  return (
    <List
      items={servers?.map((server) => ({
        onClick: () => selectServer(server),
        primary: server.name,
        secondary: server.endpoint,
        tertiary: server.selected ? <Tag>Selected</Tag> : null,
      }))}
    />
  )
}
