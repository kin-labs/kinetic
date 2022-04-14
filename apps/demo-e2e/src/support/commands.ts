// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { demoKeypairDb } from '@mogami/demo/keypair/data-access'
import { demoServerDb } from '@mogami/demo/server/data-access'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void
  }

  interface Chainable<Subject> {
    seedDb(): void
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password)
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('seedDb', () => {
  demoKeypairDb.keypair.add({
    id: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
    mnemonic: 'into actor clay vapor vacuum settle topple soon female chicken case flush',
    publicKey: 'CbHSujkci8tpk2nH31cUhtgYwNpX8w7hVoP9qXHfBvY',
    secretKey: '45zw9q67eZWELWEHKm7HQcsEMuVotmhWyZxizGEwFYeBs8VeUZNF9RypsFmnsMaj2KqBDFauZJxrpF4fbGRbdEq6',
  })
  demoServerDb.server.add({
    id: 'devnet.mogami.kin.org',
    name: 'devnet.mogami.kin.org',
    endpoint: 'https://devnet.mogami.kin.org',
  })
})
