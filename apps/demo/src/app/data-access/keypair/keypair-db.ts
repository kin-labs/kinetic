import { Dexie, Table } from 'dexie'
import { KeypairEntity } from './keypair.entity'

class KeypairDb extends Dexie {
  keypair!: Table<KeypairEntity>

  constructor() {
    super('keypairDB')
    this.version(1).stores({
      keypair: `id, publicKey`,
    })
  }
}

export const keypairDb = new KeypairDb()
