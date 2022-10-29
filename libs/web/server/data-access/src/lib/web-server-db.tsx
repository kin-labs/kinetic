import { Dexie, Table } from 'dexie'
import { WebServerEntity } from './web-server.entity'

const INITIAL_SERVERS: WebServerEntity[] = [
  {
    name: 'devnet.kinetic.kin.org',
    endpoint: 'https://devnet.kinetic.kin.org',
    selected: true,
  },
  {
    name: 'sandbox.kinetic.host',
    endpoint: 'https://sandbox.kinetic.host',
    selected: false,
  },
  {
    name: 'staging.kinetic.host',
    endpoint: 'https://staging.kinetic.host',
    selected: false,
  },
]

class WebServerDb extends Dexie {
  server!: Table<WebServerEntity>

  constructor() {
    super('WebServerDB')
    this.version(1).stores({
      server: `++id, name, endpoint, selected`,
    })
    this.on('populate', function (transaction) {
      transaction.db.table('server').bulkAdd(INITIAL_SERVERS)
    })
  }

  loadInitialData() {
    return this.server.bulkAdd(INITIAL_SERVERS)
  }
}

export const webServerDb = new WebServerDb()
