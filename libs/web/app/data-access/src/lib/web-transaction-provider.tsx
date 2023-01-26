import { TransactionStatus } from '@kin-kinetic/web/util/sdk'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface WebTransactionProviderContext {
  ip: string | undefined
  reference: string | undefined
  setIp: (ip: string | undefined) => void
  setReference: (signature: string | undefined) => void
  setSignature: (signature: string | undefined) => void
  setStatus: (status: TransactionStatus[]) => void
  setUa: (ua: string | undefined) => void
  signature: string | undefined
  status: TransactionStatus[]
  ua: string | undefined
}

const WebTransactionContext = createContext<WebTransactionProviderContext>({} as WebTransactionProviderContext)

function WebTransactionProvider({ children }: { children: ReactNode }) {
  const [ip, setIp] = useState<string | undefined>()
  const [reference, setReference] = useState<string | undefined>()
  const [signature, setSignature] = useState<string | undefined>()
  const [status, setStatus] = useState<TransactionStatus[]>([])
  const [ua, setUa] = useState<string | undefined>()

  const value: WebTransactionProviderContext = {
    ip,
    reference,
    setIp,
    setReference,
    setSignature,
    setStatus,
    setUa,
    signature,
    status,
    ua,
  }
  return <WebTransactionContext.Provider value={value}>{children}</WebTransactionContext.Provider>
}

const useWebTransaction = () => useContext(WebTransactionContext)

export { WebTransactionProvider, useWebTransaction }
