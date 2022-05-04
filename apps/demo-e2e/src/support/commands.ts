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
import { Keypair } from '@mogami/keypair'

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
  // import Alice - ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA
  const kp = Keypair.fromByteArray([
    205, 213, 7, 246, 167, 206, 37, 209, 161, 129, 168, 160, 90, 103, 198, 142, 83, 177, 214, 203, 80, 29, 71, 245, 56,
    152, 15, 8, 235, 174, 62, 79, 138, 198, 145, 111, 119, 33, 15, 237, 89, 201, 122, 89, 48, 221, 224, 71, 81, 128, 45,
    97, 191, 105, 37, 228, 243, 238, 130, 151, 53, 221, 172, 125,
  ])
  demoKeypairDb.keypair.add({ id: kp.publicKey, publicKey: kp.publicKey, secretKey: kp.secretKey })
  demoServerDb.server.add({
    id: 'localhost:3000',
    name: 'localhost:3000',
    endpoint: 'http://localhost:3000',
  })
})
