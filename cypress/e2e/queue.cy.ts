import { should } from "./utils.cy";
import { Queue, IQueue } from "../../src/components/queue-page/queue-class"
/// <reference types="cypress" />

describe("test queue", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("check the button added", () => {
    cy.get("[data-testid=input]").type("{backspace}");
    cy.get("[data-testid=button]").should("be.disabled");
  });

  it('check queue', () => {
    const queue = new Queue<string>(4);

    cy.get('[data-testid=input]').type('h');
    cy.get('[data-testid=button]').click();
    queue.enqueue('h');
    cy.get('[data-testid="testCicrle"]').as('circles');
    cy.get('@circles').eq(0).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(500)
    cy.get('@circles').children().eq(1).should(($div) => should($div, /circle_default__/));
    cy.get('@circles').eq(0).children().eq(-1).should('have.text', 'tail');
    cy.get('[data-testid=input]').type('e');
    cy.get('[data-testid=button]').click();
    queue.enqueue('e');
    cy.get('@circles').eq(1).children().eq(1).should(($div) => should($div, /circle_changing__/));
    cy.wait(500);
    cy.get('@circles').eq(1).children().eq(-1).should('have.text', 'tail');

    cy.get('[data-testid=buttonDell]').click();
    cy.get('@circles').eq(0).children().eq(1).should(($div) => should($div, /circle_changing__/));
    queue.dequeue();
    cy.wait(500);
    cy.get('@circles').eq(0).children().eq(1).should(($div) => should($div, /circle_default__/));
    cy.get('@circles').eq(0).children().eq(0).should('have.text', '');
    cy.get('@circles').eq(1).children().eq(0).should('have.text', 'head');

    cy.get('[data-testid=buttonClear]').click();
    queue.clear();

    expect(queue.isEmpty()).to.be.true

  })
});
