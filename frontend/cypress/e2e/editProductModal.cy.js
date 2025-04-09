describe("Edit Product Modal", () => {
    beforeEach(() => {
        cy.visit("/login");

        // Login
        cy.get("#username").type("user");
        cy.get("#password").type("userTest123");
        cy.get('button[type="submit"]').click();

        // Confirm redirected
        cy.url().should("eq", "http://localhost:3000/");
    });

    it("should open Edit modal and update a product", () => {
        // Wait for product list to load
        cy.contains("Edit").first().click(); // Open edit modal for first product

        // Make sure modal appears
        cy.get('[data-testid="edit-name"]').should("be.visible");

        // Clear and update name
        cy.get('[data-testid="edit-name"]').clear().type("Updated Cypress Product");
        cy.get('[data-testid="edit-image"]').clear().type("https://via.placeholder.com/300");
        cy.get('[data-testid="edit-price"]').clear().type("299.99");
        cy.get('[data-testid="edit-category"]').clear().type("Updated Category");

        // Click Save
        cy.get('[data-testid="save-button"]').click();

        // Confirm update
        cy.contains("Updated Cypress Product").should("exist");
    });
});
