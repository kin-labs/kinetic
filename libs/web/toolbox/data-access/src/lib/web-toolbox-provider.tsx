import { useWebKeypair, WebKeypairEntity } from '@kin-kinetic/web/keypair/data-access'
import { useWebServer, WebServerEntity } from '@kin-kinetic/web/server/data-access'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface WebToolboxProviderContext {
  keypair: WebKeypairEntity | undefined
  server: WebServerEntity | undefined
}

const WebToolboxContext = createContext<WebToolboxProviderContext>({} as WebToolboxProviderContext)

function WebToolboxProvider({ children }: { children: ReactNode }) {
  const { selected: selectedServer } = useWebServer()
  const { selected: selectedKeypair } = useWebKeypair()
  const [keypair, setKeypair] = useState<WebKeypairEntity>()
  const [server, setServer] = useState<WebServerEntity>()

  useEffect(() => {
    if (!selectedKeypair || selectedKeypair?.id === keypair?.id) return
    setKeypair(selectedKeypair)
  }, [selectedKeypair, keypair])

  useEffect(() => {
    if (!selectedServer || selectedServer?.id === server?.id) return
    setServer(selectedServer)
  }, [selectedServer, server])

  return <WebToolboxContext.Provider value={{ keypair, server }}>{children}</WebToolboxContext.Provider>
}

const useWebToolbox = () => useContext(WebToolboxContext)

export { WebToolboxProvider, useWebToolbox }
