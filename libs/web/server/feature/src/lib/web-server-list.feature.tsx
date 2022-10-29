import { Box } from '@chakra-ui/react'
import { useWebServer, WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { WebServerUiAddForm, WebServerUiConnection, WebServerUiList } from '@kin-kinetic/web/server/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { Button } from '@saas-ui/react'
import { useState } from 'react'

export function WebServerListFeature() {
  const { addServer, deleteServer, loadInitialData, servers, selectServer, updateServer } = useWebServer()

  const [open, setOpen] = useState<WebServerEntity>()

  return (
    <WebUiPage title={'Servers'} actionRight={<WebServerUiAddForm addServer={addServer} />}>
      <WebUiCard>
        {!servers?.length ? (
          <Button onClick={loadInitialData}>Load initial servers.</Button>
        ) : (
          <WebServerUiList
            servers={servers || []}
            updateServer={updateServer}
            openServer={setOpen}
            deleteServer={deleteServer}
            selectServer={selectServer}
          ></WebServerUiList>
        )}
      </WebUiCard>
      {open && (
        <WebUiCard>
          <WebServerUiConnection server={open} />
          <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
            {JSON.stringify(open, null, 2)}
          </Box>
        </WebUiCard>
      )}
    </WebUiPage>
  )
}
