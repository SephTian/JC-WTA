/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display logout button on bottom navbar when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('p[data-testid="error-alert-email"]').should('have.text', '"email" is not allowed to be empty').and('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('joko@gmail.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('p[data-testid="error-alert-password"]').should('have.text', '"password" is not allowed to be empty').and('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('joko@gmail.com');

    cy.get('input[placeholder="Password"]').type('bukan_password_ku');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('p[data-testid="error-alert"]').should('have.text', 'email or password is wrong').and('be.visible');
  });

  it('should display logout button on bottom navbar when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('Joko@gmail.com');
    cy.get('input[placeholder="Password"]').type('bukanpwd');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('button[data-testid="logout-button"]').should('be.visible');
  });
});
