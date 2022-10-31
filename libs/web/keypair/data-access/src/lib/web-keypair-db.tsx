import { Keypair } from '@kin-kinetic/keypair'
import { ellipsify } from '@kin-kinetic/web/app/ui'
import { Dexie, Table } from 'dexie'
import { WebKeypairEntity } from './web-keypair.entity'

class WebKeypairDb extends Dexie {
  keypair!: Table<WebKeypairEntity>

  constructor() {
    super('WebKeypairDB')
    this.version(1).stores({
      keypair: `++id, name, publicKey, isDefault`,
    })
    this.on('populate', function (transaction) {
      const { mnemonic, publicKey, secretKey } = Keypair.random()
      transaction.db.table('keypair').bulkAdd([{ mnemonic, name: ellipsify(publicKey), publicKey, secretKey }])
    })
  }
}

export const webKeypairDb = new WebKeypairDb()
