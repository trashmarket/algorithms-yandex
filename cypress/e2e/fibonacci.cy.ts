/// <reference types="cypress" />

describe('test fibonacci', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
  })

  it('check button', () => {
    cy.get('[name=numInput]').type('{backspace}');
    cy.get('[data-testid=button]').should('be.disabled');
  })

  it('should generates correct number', () => {
    cy.get('[name=numInput]').type('4');
    cy.get('[data-testid=button]').click();
    cy.wait(5000);
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('@circles').should(($div) => {
      expect($div).to.have.length(5);
    })
    cy.get('@circles').eq(0).children().eq(1).should('have.text', '1')
    cy.get('@circles').eq(1).children().eq(1).should('have.text', '1')
    cy.get('@circles').eq(2).children().eq(1).should('have.text', '2')
    cy.get('@circles').eq(3).children().eq(1).should('have.text', '3')
    cy.get('@circles').eq(4).children().eq(1).should('have.text', '5')
  })

})