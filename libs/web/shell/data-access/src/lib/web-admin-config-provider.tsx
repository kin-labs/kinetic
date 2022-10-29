import { useToast } from '@chakra-ui/react'
import { AdminConfig, useAdminConfigQuery } from '@kin-kinetic/web/util/admin-sdk'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface WebAdminConfigProviderContext {
  loading: boolean
  config: AdminConfig | undefined
}

const WebAdminConfigProviderContext = createContext<WebAdminConfigProviderContext>({} as WebAdminConfigProviderContext)
function WebAdminConfigProvider({ children }: { children: ReactNode }) {
  const toast = useToast()
  const [{ data, error, fetching }] = useAdminConfigQuery()
  const [config, setConfig] = useState<AdminConfig | undefined>(undefined)

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
    if (data?.adminConfig) {
      setConfig(data.adminConfig)
    }
  }, [fetching, data])

  const value = {
    loading: fetching,
    config,
  }
  return <WebAdminConfigProviderContext.Provider value={value}>{children}</WebAdminConfigProviderContext.Provider>
}

const useWebAdminConfig = () => useContext(WebAdminConfigProviderContext)

export { WebAdminConfigProvider, useWebAdminConfig }
