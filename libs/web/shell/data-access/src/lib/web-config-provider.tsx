import { useToast } from '@chakra-ui/react'
import { useWebConfigQuery, WebConfig } from '@kin-kinetic/web/util/sdk'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface WebConfigProviderContextProps {
  loading: boolean
  config: WebConfig | undefined
}

const WebConfigProviderContext = createContext<WebConfigProviderContextProps>({} as WebConfigProviderContextProps)
function WebConfigProvider({ children }: { children: ReactNode }) {
  const toast = useToast()
  const [{ data, error, fetching }] = useWebConfigQuery()
  const [config, setConfig] = useState<WebConfig | undefined>(undefined)

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error])

  useEffect(() => {
    if (fetching || !data) return
    if (data?.config) {
      setConfig(data.config)
    }
  }, [fetching, data])

  const value = {
    loading: fetching,
    config,
  }
  return <WebConfigProviderContext.Provider value={value}>{children}</WebConfigProviderContext.Provider>
}

const useWebConfig = () => useContext(WebConfigProviderContext)

export { WebConfigProvider, useWebConfig }
