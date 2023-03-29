/// <reference types="cypress" />
import { should } from "./utils.cy";

describe('test stack', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('check the button added', () => {
    cy.get('[data-testid=input]').type('{backspace}');
    cy.get('[data-testid=button]').should('be.disabled');
  })

  it('added element check', () => {
    cy.get('[data-testid=input]').type('h');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('@circles').children().eq(1).should('have.text', 'h');
    cy.get('@circles').children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('@circles').children().eq(1).should(($div) => should($div, /circle_default__/));

    cy.get('[data-testid=input]').type('e');
    cy.get('[data-testid=button]').click();
    cy.get('@circles').eq(1).children().eq(1).should('have.text', 'e');
    cy.get('@circles').eq(1).children().eq(1).should(($div) => should($div, /circle_changing__/));    
    cy.wait(1000);
    cy.get('@circles').eq(1).children().eq(1).should(($div) => should($div, /circle_default__/));

    cy.get('[data-testid=buttonDell]').click();
    cy.get('@circles').eq(1).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('[data-testid="buttonCliner"]').click()
    cy.get('@circles').should('not.exist');

  })

  // it('remove element check', () => {

    // cy.get('[data-testid=buttonDell]').click();
  //   // cy.get('[data-testid="testCicrle"]').as('circles');
  //   // cy.get('@circles').children().eq(1).should(($div) => should($div, /circle_changing__/));
  //   // cy.wait(1000);
  //   // cy.get('@circles').children().eq(1).should('not.exist');
  //   // cy.get('[data-testid=buttonDell]').should('be.disabled');

  // })
})