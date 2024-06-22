// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (email, password) => {
    if (email) {
        cy.get('[name="email"]').type(email);
    }
    if (password) {
        cy.get('[name="password"]').type(password);
    }
    cy.contains("Авторизоваться").click();
  });
  
  Cypress.Commands.add("addUser", (body) => {
    cy.request("POST", "/user", body);
  });
  
  Cypress.Commands.add("updateUser", (username, body) => {
    cy.request("PUT", `/user/${username}`, body);
  });
  
  Cypress.Commands.add("deleteUser", (username) => {
    cy.request("DELETE", `/user/${username}`);
  });
  
  Cypress.Commands.add("getUser", (userName) => {
    cy.request({
      url: `/user/${userName}`,
      failOnStatusCode: false,
    });
  });