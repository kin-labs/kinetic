/* ==== Test Created with Cypress Studio ==== */
it.skip('demo', function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:4200/')
  cy.get(':nth-child(4) > a').click()
  cy.get('.flex-col > .flex > .btn').click()
  cy.get('.input').click()
  cy.get('.modal-open').click()
  cy.get('.input').clear()
  cy.get('.input').type('https://devnet.mogami.kin.org')
  cy.get('.btn-primary').click()
  cy.get(':nth-child(2) > a').click()
  cy.get('.flex-col > .flex > :nth-child(1)').click()
  cy.get(
    '[d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"]',
  ).click()
  cy.get('.modal-box > :nth-child(1) > .modal-action > .btn').click()
  cy.get(':nth-child(3) > a').click()
  cy.get(':nth-child(2) > div > .btn').click()
  cy.get(':nth-child(6) > .flex > .btn').click()
  cy.get(':nth-child(3) > .flex > .btn').click()
  cy.get(':nth-child(4) > .flex > .btn').click()
  cy.get(':nth-child(5) > .flex > .btn').click()
  /* ==== End Cypress Studio ==== */
})
