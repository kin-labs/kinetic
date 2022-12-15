import { Tag } from '@chakra-ui/react'
import { WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { List } from '@saas-ui/react'
import { WebServerUiListItemMenu } from './web-server-ui-list-item.menu'

export function WebServerUiList({
  deleteServer,
  openServer,
  selectServer,
  servers,
  updateServer,
}: {
  deleteServer: (server: WebServerEntity) => void
  openServer: (server: WebServerEntity) => void
  selectServer: (server: WebServerEntity) => void
  servers: WebServerEntity[]
  updateServer: (server: WebServerEntity) => void
}) {
  return (
    <List
      items={servers?.map((server) => ({
        onClick: () => openServer(server),
        primary: server.name,
        secondary: server.endpoint,
        tertiary: server.selected ? <Tag>Selected</Tag> : null,
        action: (
          <WebServerUiListItemMenu
            deleteServer={deleteServer}
            selectServer={selectServer}
            server={server}
            updateServer={updateServer}
          />
        ),
      }))}
    />
  )
}
