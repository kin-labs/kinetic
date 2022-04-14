import { Dexie, Table } from 'dexie'
import { DemoServerEntity } from './demo-server.entity'

class DemoServerDb extends Dexie {
  server!: Table<DemoServerEntity>

  constructor() {
    super('serverDB')
    this.version(1).stores({
      server: `id, name`,
    })
  }
}

export const demoServerDb = new DemoServerDb()
