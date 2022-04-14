import { Dexie, Table } from 'dexie'
import { DemoKeypairEntity } from './demo-keypair.entity'

class DemoKeypairDb extends Dexie {
  keypair!: Table<DemoKeypairEntity>

  constructor() {
    super('keypairDB')
    this.version(1).stores({
      keypair: `id, publicKey`,
    })
  }
}

export const demoKeypairDb = new DemoKeypairDb()
