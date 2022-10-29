import { useLiveQuery } from 'dexie-react-hooks'
import { createContext, ReactNode, useContext } from 'react'
import { webServerDb } from './web-server-db'
import { WebServerEntity } from './web-server.entity'

export interface WebServerProviderContext {
  addServer: (server: WebServerEntity) => void
  deleteServer: (server: WebServerEntity) => void
  loadInitialData: () => void
  servers: WebServerEntity[] | undefined
  selected?: WebServerEntity
  selectServer: (server: WebServerEntity) => void
  updateServer: (server: WebServerEntity) => void
}

const WebServerContext = createContext<WebServerProviderContext>({} as WebServerProviderContext)

function WebServerProvider({ children }: { children: ReactNode }) {
  const servers = useLiveQuery(() => webServerDb.server.toArray())

  const addServer = ({ endpoint, name }: WebServerEntity) => {
    return webServerDb.server.add({
      name,
      endpoint,
      selected: false,
    })
  }

  const deleteServer = ({ id }: WebServerEntity) => {
    if (!id) return
    return webServerDb.server.delete(id)
  }

  const selectServer = (selected: WebServerEntity) => {
    webServerDb.server.bulkPut(
      servers?.map((server) => {
        server.selected = server === selected
        return server
      }) || [],
    )
  }

  const updateServer = ({ id, endpoint, name }: WebServerEntity) => {
    if (!id) return
    return webServerDb.server.update(id, {
      name,
      endpoint,
    })
  }

  const value = {
    addServer,
    deleteServer,
    loadInitialData: () => webServerDb.loadInitialData(),
    servers,
    selected: servers?.find((item) => item.selected),
    selectServer,
    updateServer,
  }
  return <WebServerContext.Provider value={value}>{children}</WebServerContext.Provider>
}

const useWebServer = () => useContext(WebServerContext)

export { WebServerProvider, useWebServer }
