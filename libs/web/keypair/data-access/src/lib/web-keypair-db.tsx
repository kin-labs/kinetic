import { Dexie, Table } from 'dexie'
import { WebKeypairEntity } from './web-keypair.entity'

const INITIAL_SERVERS: WebKeypairEntity[] = []

class WebKeypairDb extends Dexie {
  keypair!: Table<WebKeypairEntity>

  constructor() {
    super('WebKeypairDB')
    this.version(1).stores({
      keypair: `++id, name, publicKey, isDefault`,
    })
    this.on('populate', function (transaction) {
      transaction.db.table('keypair').bulkAdd(INITIAL_SERVERS)
    })
  }

  loadInitialData() {
    return this.keypair.bulkAdd(INITIAL_SERVERS)
  }
}

export const webKeypairDb = new WebKeypairDb()
