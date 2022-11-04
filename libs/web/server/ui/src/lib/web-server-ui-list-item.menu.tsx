import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useToast } from '@chakra-ui/react'
import { WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { BiDotsVertical } from 'react-icons/bi'
import { MdDelete, MdSelectAll, MdSettings } from 'react-icons/md'
import { WebServerUiSettingsForm } from './web-server-ui-settings.form'

export function WebServerUiListItemMenu({
  selectServer,
  deleteServer,
  updateServer,
  server,
}: {
  selectServer: (server: WebServerEntity) => void
  deleteServer: (server: WebServerEntity) => void
  updateServer: (server: WebServerEntity) => void
  server: WebServerEntity
}) {
  const toast = useToast()

  const disclosure = useDisclosure()
  return (
    <b>
      <WebServerUiSettingsForm disclosure={disclosure} server={server} updateServer={updateServer} />
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<BiDotsVertical />} variant="ghost" />
        <MenuList>
          <MenuItem icon={<MdSettings />} onClick={() => disclosure.onOpen()}>
            Edit Server settings
          </MenuItem>
          <MenuItem
            icon={<MdSelectAll />}
            onClick={() => {
              selectServer(server)
              toast({
                status: 'success',
                title: `Selected server ${server.endpoint}`,
              })
            }}
          >
            Select Server
          </MenuItem>
          <MenuItem
            icon={<MdDelete />}
            isDisabled={server.selected}
            onClick={() => {
              deleteServer(server)
              toast({
                status: 'success',
                title: `Deleted server ${server.endpoint}`,
              })
            }}
          >
            Delete Server
          </MenuItem>
        </MenuList>
      </Menu>
    </b>
  )
}
