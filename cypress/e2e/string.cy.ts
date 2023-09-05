/// <reference types="cypress" />
import { should } from "./utils.cy"

describe('test string', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('check button', () => {
    cy.get('[name=textFied]').type('{backspace}')
    cy.get('[data-testid=button]').should('be.disabled')
  })

  it('should reverse string correctly with animation', () => {
    cy.get('[name=textFied]').type('hello');
    cy.get('[data-testid=button]').click();
    
    cy.get('[data-testid="testCicrle"]').eq(0).should('have.text', 'h')
    cy.get('[data-testid="testCicrle"]').eq(0).children().eq(1).should((div) => should(div, /circle_changing__/))
    cy.get('[data-testid="testCicrle"]').eq(4).should('have.text', 'o')
    cy.get('[data-testid="testCicrle"]').eq(4).children().eq(1).should((div) => should(div, /circle_changing__/))

    cy.wait(1000)
    cy.get('[data-testid="testCicrle"]').eq(0).should('have.text', 'o')
    cy.get('[data-testid="testCicrle"]').eq(0).children().eq(1).should((div) => should(div, /circle_modified__/))
    cy.get('[data-testid="testCicrle"]').eq(4).should('have.text', 'h')
    cy.get('[data-testid="testCicrle"]').eq(4).children().eq(1).should((div) => should(div, /circle_modified__/))

    cy.get('[data-testid="testCicrle"]').eq(1).should('have.text', 'e')
    cy.get('[data-testid="testCicrle"]').eq(1).children().eq(1).should((div) => should(div, /circle_changing__/))
    cy.get('[data-testid="testCicrle"]').eq(3).should('have.text', 'l')
    cy.get('[data-testid="testCicrle"]').eq(3).children().eq(1).should((div) => should(div, /circle_changing__/))
    cy.wait(1000)
    cy.get('[data-testid="testCicrle"]').eq(1).should('have.text', 'l')
    cy.get('[data-testid="testCicrle"]').eq(1).children().eq(1).should((div) => should(div, /circle_modified__/))
    cy.get('[data-testid="testCicrle"]').eq(3).should('have.text', 'e')
    cy.get('[data-testid="testCicrle"]').eq(3).children().eq(1).should((div) => should(div, /circle_modified__/))

    cy.get('[data-testid="testCicrle"]').eq(2).children().eq(1).should((div) => should(div, /circle_changing__/))    
    cy.wait(1000)

    cy.get('[data-testid="testCicrle"]').eq(2).should('have.text', 'l')
    cy.get('[data-testid="testCicrle"]').eq(2).children().eq(1).should((div) => should(div, /circle_modified__/))

  })
})