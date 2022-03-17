import { Dexie, Table } from 'dexie'
import { ServerEntity } from './server.entity'

class ServerDb extends Dexie {
  server!: Table<ServerEntity>

  constructor() {
    super('serverDB')
    this.version(1).stores({
      server: `id, name`,
    })
  }
}

export const serverDb = new ServerDb()
