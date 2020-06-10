/* eslint-disable no-undef */
/// <reference types="Cypress" />
describe('Advanced state management', () => {
  it('Visits content 3', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('Content 3').click();
    cy.url().should('include', '/content3');
  });
  it('Add Users', () => {
    cy.findByTestId('name').type('testname');
    cy.findByLabelText('age').type('30');
    cy.findByLabelText('email').type('test@example.com');
    cy.findByText('Add').click();
    cy.contains('test@example.com').should('exist');

    cy.findByTestId('name').type('testname2');
    cy.findByLabelText('age').type('20');
    cy.findByLabelText('email').type('test2@example.com');
    cy.findByText('Add').click();
    cy.contains('test@example.com').should('exist');
  });
  it('Undo Changes', () => {
    cy.findByText('Undo').click();
    cy.contains('test2@example.com').should('not.exist');
    cy.findByText('Undo').click();
    cy.contains('test@example.com').should('not.exist');
  });

  it('Redo Changes', () => {
    cy.findByText('Redo').click();
    cy.contains('test@example.com').should('exist');
    cy.findByText('Redo').click();
    cy.contains('test2@example.com').should('exist');
  });

  it('Remove Users', () => {
    cy.findByTestId('test@example.com').click();
    cy.contains('test@example.com').should('not.exist');
    cy.findByTestId('test2@example.com').click();
    cy.contains('test2@example.com').should('not.exist');
  });
});
