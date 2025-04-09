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
// cypress/support/commands.js
// Cypress.Commands.add('login', () => {
//     cy.visit('/login');
//     cy.session('userSession', () => {
//         cy.visit('http://localhost:3000/login');

//         cy.get('#username').type('user');
//         cy.get('#password').type('userTest123');
//         cy.get('button[type="submit"]').click();
//     });
// });

Cypress.Commands.add('login', () => {
    cy.session('userSession', () => {
        cy.request('POST', '/api/auth/callback/credentials', {
            redirect: false,
            username: 'user',
            password: 'userTest123',
        });
    });
});

