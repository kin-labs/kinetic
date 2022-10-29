import { TransactionStatus } from '@kin-kinetic/web/util/admin-sdk'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface WebTransactionProviderContext {
  ip: string | undefined
  referenceId: string | undefined
  referenceType: string | undefined
  setIp: (ip: string | undefined) => void
  setReferenceId: (signature: string | undefined) => void
  setReferenceType: (signature: string | undefined) => void
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
  const [referenceId, setReferenceId] = useState<string | undefined>()
  const [referenceType, setReferenceType] = useState<string | undefined>()
  const [signature, setSignature] = useState<string | undefined>()
  const [status, setStatus] = useState<TransactionStatus[]>([])
  const [ua, setUa] = useState<string | undefined>()

  const value: WebTransactionProviderContext = {
    ip,
    referenceId,
    referenceType,
    setIp,
    setReferenceId,
    setReferenceType,
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
