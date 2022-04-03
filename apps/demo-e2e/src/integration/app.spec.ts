import { getHeader } from '../support/app.po'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { serverDb } from '../../../demo/src/app/data-access/server'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { keypairDb } from '../../../demo/src/app/data-access/keypair'

describe('demo', () => {
  beforeEach(() => {
    serverDb.server.clear()
    keypairDb.keypair.clear()
    cy.visit('/')
  })

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getHeader().contains('Mogami')
  })

  it('should add dev Mogami server', () => {
    cy.get('[cy-data="cy-nav-btn-servers"]').click()
    cy.get('[cy-data="card-servers-warning"]').contains('No Servers found.')
    cy.get('.flex-col > .flex > .btn').click()
    cy.get('.input').click()
    cy.get('.modal-open').click()
    cy.get('.input').clear()
    cy.get('.input').type('https://devnet.mogami.kin.org')
    cy.get('.btn-primary').click()
    cy.get('.card-body').contains('devnet.mogami.kin.org')
  })

  it('should generate a keypair', () => {
    cy.get('[cy-data="cy-nav-btn-keypair"]').click()
    cy.get('[cy-data="card-keypair-warning"]').contains('No Keypairs found.')
    cy.get('.generate-keypair-btn').click()
    cy.get('.keypair-eye-icon').click()
    cy.get('.text-area-mnemonic')
      .invoke('val')
      .then((text) => {
        const mnemonic = (text as string).split(' ')
        expect(mnemonic.length).equals(12)
      })
    cy.get('.modal-box > :nth-child(1) > .modal-action > .btn').click()
  })

  it('should import mnemonic', () => {
    // into actor clay vapor vacuum settle topple soon female chicken case flush
    // CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY
    // 45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6
    cy.get('[cy-data="cy-nav-btn-keypair"]').click()
    cy.get('[cy-data="card-keypair-warning"]').contains('No Keypairs found.')
    cy.get('.import-mnemonic-btn').click()
    cy.get('.modal-box > :nth-child(1) > .textarea') // .text-area-mnemonic
      .type('into actor clay vapor vacuum settle topple soon female chicken case flush')
    cy.get('.btn-primary').click()
    cy.get('.card-body').contains('CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY')
    cy.get('.keypair-eye-icon').click()
    cy.get('.text-area-secret-key')
      .invoke('val')
      .then((secret) => {
        expect(secret).equals(
          '45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6',
        )
      })
  })

  it('should make sure a keypair is configured to use the sdk', () => {
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('[cy-data="card-sdk-warning"]').contains('No Keypairs configured.')
  })

  it('should make sure a server is configured to use the sdk', () => {
    keypairDb.keypair.add({
      id: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
      mnemonic: 'into actor clay vapor vacuum settle topple soon female chicken case flush',
      publicKey: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
      secretKey: '45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6',
    })
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('[cy-data="card-sdk-warning"]').contains('No Servers configured.')
  })

  it('should get the server configuration', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-server-config-btn').click()
    cy.get('[cy-data="panel-get-server-config"]').then((el) => {
      const config = JSON.parse(el[0].innerText)
      expect(config.environment).to.equals('production')
      expect(config.port).to.satisfy(Number.isInteger)
      expect(config.solanaRpcEndpoint).to.equals('devnet')
    })
  })

  it('should create an account', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.create-account-btn')
    // .click()
    // cy.get('[cy-data="panel-create-account"]')
  })

  it('should request an airdrop', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.request-airdrop-btn')
    // .click()
    // cy.get('[cy-data="panel-request-airdrop"]')
  })

  it('should get balance from an account', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-account-balance-btn').click()
    cy.get('[cy-data="panel-get-account-balance"]').then((el) => {
      const balance = JSON.parse(el[0].innerText)
      expect(balance.value).to.equals('100000')
    })
  })

  it('should get token accounts', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-token-accounts-btn').click()
    cy.get('[cy-data="panel-get-token-accounts"]').then((el) => {
      const tokenAccounts = JSON.parse(el[0].innerText)
      expect(tokenAccounts).to.include('Eb2R6XuUb2fCR5o8JZ6uTP62u8xMuxXEUoko72kUR6pn')
    })
  })

  it('should get account history', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-account-history-btn').click()
    cy.get('[cy-data="panel-get-account-history"]').then((el) => {
      const accountHistory = JSON.parse(el[0].innerText)[0]
      expect(accountHistory.history.length).to.equals(3)
      expect(accountHistory.account).to.equals('Eb2R6XuUb2fCR5o8JZ6uTP62u8xMuxXEUoko72kUR6pn')
    })
  })

  it('should submit a payment', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.submit-payment-btn')
    // .click()
    // cy.get('[cy-data="panel-submit-payment"]')
  })
})
