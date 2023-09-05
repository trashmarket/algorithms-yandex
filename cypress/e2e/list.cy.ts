/// <reference types="cypress" />
import { should } from "./utils.cy";
describe('test list', () => {
  beforeEach(() => {
    cy.visit('/list')
  })

  it('check buttons', () => {
    cy.get('[data-testid="input"]').type('{backspace}');
    cy.get('[data-testid="buttonHead"]').should('be.disabled');
    cy.get('[data-testid="buttonIndexAdd"]').should('be.disabled');
  })

  it('check default list', () =>  {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('@circles').eq(0).children().eq(0).should('have.text', 'head');
    cy.get('@circles').eq(0).children().eq(1).should('have.text', '0');
    cy.get('@circles').eq(1).children().eq(1).should('have.text', '34');
    cy.get('@circles').eq(2).children().eq(1).should('have.text', '8');
    cy.get('@circles').eq(3).children().eq(1).should('have.text', '1');
    cy.get('@circles').eq(-1).children().eq(-1).should('have.text', 'tail');
  })

  it('add elements head', () => {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('[data-testid="input"]').type('h');
    cy.get('[data-testid="buttonHead"]').click();
    cy.get('@circles').eq(0).children().eq(0).children().eq(0).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('@circles').eq(0).children().eq(1).should('have.text', 'h');
    cy.get('@circles').eq(0).children().eq(1).should(($div) => should($div, /circle_modified__/));
    cy.wait(500);
    cy.get('@circles').eq(0).children().eq(1).should(($div) => should($div, /circle_default__/));
    cy.get('@circles').should('have.length', '5')  
  })

  it('add elements tail', () => {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('[data-testid="input"]').type('e');
    cy.get('[data-testid="buttonTail"]').click();
    cy.get('@circles').eq(-1).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('@circles').eq(-1).children().eq(1).should('have.text', 'e');
    cy.get('@circles').eq(-1).children().eq(1).should(($div) => should($div, /circle_modified__/));
    cy.wait(500);
    cy.get('@circles').eq(-1).children().eq(1).should(($div) => should($div, /circle_default__/));
    cy.get('@circles').should('have.length', '5')  
  })

  it('add elements by index', () => {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('[data-testid="input"]').type('l');
    cy.get('[data-testid="inputIndex"]').type('2');
    cy.get('[data-testid="buttonIndexAdd"]').click();
    cy.get('@circles').eq(2).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('@circles').eq(2).children().eq(1).should('have.text', 'l');
    cy.get('@circles').eq(2).children().eq(1).should(($div) => should($div, /circle_modified__/));
    cy.wait(500);
    cy.get('@circles').eq(2).children().eq(1).should(($div) => should($div, /circle_default__/));
    cy.get('@circles').should('have.length', '5')  
  })

  it('dell elements head', () => {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('[data-testid="buttonDellHead"]').click();
    cy.wait(1000);
    cy.get('@circles').eq(0).children().eq(-1).children().eq(0).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.get('@circles').eq(0).children().eq(-1).children().eq(0).children().eq(1).should('have.text', '0');
    cy.get('@circles').should('have.length', '3')
  })

  it('dell elements tail', () => {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('[data-testid="buttonDellTail"]').click();
    cy.wait(1000);
    cy.get('@circles').eq(-1).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.get('@circles').should('have.length', '3')
  })

  it('dell elements by index', () => {
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('[data-testid="inputIndex"]').type('2');
    cy.get('[data-testid="buttonIndexDell"]').click();
    cy.wait(1000);
    cy.get('@circles').eq(0).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('@circles').eq(1).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(1000);
    cy.get('@circles').eq(2).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.get('@circles').should('have.length', '3')
  })
})