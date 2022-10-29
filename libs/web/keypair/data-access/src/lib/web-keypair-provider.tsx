import { Keypair } from '@kin-kinetic/keypair'
import { ellipsify } from '@kin-kinetic/web/app/ui'
import { useLiveQuery } from 'dexie-react-hooks'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { webKeypairDb } from './web-keypair-db'
import { WebKeypairEntity } from './web-keypair.entity'

export interface WebKeypairProviderContext {
  addKeypair: (keypair: WebKeypairEntity) => void
  deleteKeypair: (keypairId: number) => void
  keypairs: WebKeypairEntity[] | undefined
  selected?: WebKeypairEntity
  selectKeypair: (keypairId: number) => void
  updateKeypair: (keypair: WebKeypairEntity) => void
}

const WebKeypairContext = createContext<WebKeypairProviderContext>({} as WebKeypairProviderContext)

function WebKeypairProvider({ children }: { children: ReactNode }) {
  const keypairs = useLiveQuery(() => webKeypairDb.keypair.toArray())

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

  const selectKeypair = (keypairId: number) => {
    webKeypairDb.keypair.bulkPut(
      keypairs?.map((keypair) => {
        keypair.isDefault = keypair.id === keypairId
        return keypair
      }) || [],
    )
  }

  const updateKeypair = ({ id, name }: WebKeypairEntity) => {
    if (!id) return
    return webKeypairDb.keypair.update(id, {
      name,
    })
  }

  useEffect(() => {
    if (!keypairs?.length) {
      const { mnemonic, publicKey, secretKey } = Keypair.random()
      addKeypair({ mnemonic, publicKey, secretKey })
    }
  }, [])

  const value = {
    addKeypair,
    deleteKeypair,
    keypairs,
    selected: keypairs?.find((item) => item.isDefault),
    selectKeypair,
    updateKeypair,
  }
  return <WebKeypairContext.Provider value={value}>{children}</WebKeypairContext.Provider>
}

const useWebKeypair = () => useContext(WebKeypairContext)

export { WebKeypairProvider, useWebKeypair }
