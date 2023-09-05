/// <reference types="cypress" />

describe('service is available', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('test router', () => {
    cy.get('[class^=main-page_cards_box__]').as('pageWrapper')
    let i = 0;

    while(i < 6) {
      cy.get('@pageWrapper').children().eq(i).click()
      cy.get('a').click()
      i++
    }
  })
})