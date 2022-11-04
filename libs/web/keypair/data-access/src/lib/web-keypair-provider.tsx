import { Keypair } from '@kin-kinetic/keypair'
import { ellipsify } from '@kin-kinetic/web/app/ui'
import { useLiveQuery } from 'dexie-react-hooks'
import { createContext, ReactNode, useContext } from 'react'
import { webKeypairDb } from './web-keypair-db'
import { WebKeypairEntity } from './web-keypair.entity'

export interface WebKeypairProviderContext {
  addKeypair: (keypair: WebKeypairEntity) => void
  deleteKeypair: (keypairId: number) => void
  generateKeypair: () => void
  keypairs: WebKeypairEntity[] | undefined
  selected?: WebKeypairEntity
  selectKeypair: (keypairId: number) => void
  updateKeypair: ({ id, name }: { id: number; name: string }) => void
}

const WebKeypairContext = createContext<WebKeypairProviderContext>({} as WebKeypairProviderContext)

function WebKeypairProvider({ children }: { children: ReactNode }) {
  const keypairs = useLiveQuery(() => webKeypairDb.keypair.orderBy('name').toArray())

  const addKeypair = ({ publicKey, secretKey, mnemonic }: WebKeypairEntity) => {
    return webKeypairDb.keypair.add({
      isDefault: false,
      name: ellipsify(publicKey),
      publicKey,
      secretKey,
      mnemonic,
    })
  }

  const deleteKeypair = (keypairId: number) => {
    return webKeypairDb.keypair.delete(keypairId)
  }

  const generateKeypair = () => {
    const { mnemonic, publicKey, secretKey } = Keypair.random()
    addKeypair({ mnemonic, publicKey, secretKey })
  }

  const selectKeypair = (keypairId: number) => {
    webKeypairDb.keypair.bulkPut(
      keypairs?.map((keypair) => {
        keypair.isDefault = keypair.id === keypairId
        return keypair
      }) || [],
    )
  }

  const updateKeypair = ({ id, name }: { id: number; name: string }) => {
    if (!id) return
    return webKeypairDb.keypair.update(id, {
      name,
    })
  }

  const value = {
    addKeypair,
    deleteKeypair,
    generateKeypair,
    keypairs,
    selected: keypairs?.find((item) => item.isDefault),
    selectKeypair,
    updateKeypair,
  }
  return <WebKeypairContext.Provider value={value}>{children}</WebKeypairContext.Provider>
}

const useWebKeypair = () => useContext(WebKeypairContext)

export { WebKeypairProvider, useWebKeypair }
