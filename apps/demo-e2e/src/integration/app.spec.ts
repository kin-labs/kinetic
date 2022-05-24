/* eslint-disable cypress/no-unnecessary-waiting */
import { demoKeypairDb } from '@mogami/demo/keypair/data-access'
import { demoServerDb } from '@mogami/demo/server/data-access'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getHeader } from '../support/app.po'

describe('demo', () => {
  beforeEach(() => {
    demoServerDb.server.clear()
    demoKeypairDb.keypair.clear()
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
    cy.get('.chakra-button.add-server-btn').click()
    cy.get('.chakra-input').click()
    cy.get('.chakra-modal__body').click()
    cy.get('.chakra-input').clear()
    cy.get('.chakra-input').type('http://localhost:3000')
    cy.get('.chakra-button.submit').click()
    cy.get('.chakra-code').contains('localhost:3000')
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
    cy.get('.chakra-button.close').click()
  })

  it('should import mnemonic', () => {
    // into actor clay vapor vacuum settle topple soon female chicken case flush
    // CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY
    // 45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6
    cy.get('[cy-data="cy-nav-btn-keypair"]').click()
    cy.get('[cy-data="card-keypair-warning"]').contains('No Keypairs found.')
    cy.get('.import-mnemonic-btn').click()
    cy.get('.import-mnemonic') // .text-area-mnemonic
      .type('into actor clay vapor vacuum settle topple soon female chicken case flush')
    cy.get('.chakra-button.submit').click()
    cy.get('.chakra-code').contains('CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY')
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
    demoKeypairDb.keypair.add({
      id: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
      mnemonic: 'into actor clay vapor vacuum settle topple soon female chicken case flush',
      publicKey: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
      secretKey: '45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6',
    })
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.contains('No Servers configured.')
  })

  it('should get the app configuration', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-app-config-btn').click()
    cy.get('[cy-data="panel-get-app-config"]').then((el) => {
      const config = JSON.parse(el[0].innerText)
      expect(config.app.index).to.equals(1)
      expect(config.app.name).to.equals('App 1')
      expect(config.mint.feePayer).to.equals('oWNEYV3aMze3CppdgyFAiEj9xUJXkn85es1KscRHt8m')
      expect(config.mint.programId).to.equals(TOKEN_PROGRAM_ID.toBase58())
      expect(config.mint.publicKey).to.equals('MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek')
    })
  })

  it('should create an account', () => {
    demoKeypairDb.keypair.add({
      id: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
      mnemonic: 'into actor clay vapor vacuum settle topple soon female chicken case flush',
      publicKey: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
      secretKey: '45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6',
    })
    demoServerDb.server.add({
      id: 'localhost:3000',
      name: 'localhost:3000',
      endpoint: 'http://localhost:3000',
    })
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.create-account-btn').click()
    cy.get('[cy-data="panel-create-account"]')
  })

  it('should get balance from an account', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-account-balance-btn').click()
    cy.get('[cy-data="panel-get-account-balance"]').then((el) => {
      const balance = JSON.parse(el[0].innerText)
      expect(balance.value).to.equals('10000000000')
    })
  })

  it('should request an airdrop', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.request-airdrop-btn').click()
    cy.wait(17000)
    cy.get('[cy-data="panel-request-airdrop"]')
  })

  it('should get token accounts', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-token-accounts-btn').click()
    cy.get('[cy-data="panel-get-token-accounts"]').then((el) => {
      const tokenAccounts = JSON.parse(el[0].innerText)
      expect(tokenAccounts).to.include('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
    })
  })

  it('should get account history', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.get-account-history-btn').click()
    cy.get('[cy-data="panel-get-account-history"]').then((el) => {
      const accountHistory = JSON.parse(el[0].innerText)[0]
      expect(accountHistory.account).to.equals('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
    })
  })

  it('should submit a payment', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.submit-payment-btn').click()
    cy.get('[cy-data="panel-submit-payment"]').then((el) => {
      const text = JSON.parse(el[0].innerText)
      assert.isString(text.signature)
      assert.isEmpty(text.errors)
    })
  })

  it('should submit a payment batch', () => {
    cy.seedDb()
    cy.get('[cy-data="cy-nav-btn-sdk"]').click()
    cy.get('.submit-batch-payments-btn').click()
    cy.get('[cy-data="panel-submit-payment-batch"]').then((el) => {
      const text = JSON.parse(el[0].innerText)
      assert.isString(text.signature)
      assert.isEmpty(text.errors)
    })
  })
})
