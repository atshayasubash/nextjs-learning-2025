describe("Add Product Modal", () => {
    beforeEach(() => {
        cy.visit("/login");

        // Login first
        cy.get('input#username').type("user"); // or use data-testid
        cy.get('input#password').type("userTest123");
        cy.get('button[type="submit"]').click();

        // Now on homepage
        cy.url().should("eq", "http://localhost:3000/");
    });

    it("should open the modal and add a new product", () => {
        // 1. Click "Add Product"
        cy.contains("Add Product").click();

        // 2. Modal should appear
        cy.get('[data-testid="input-name"]').should("be.visible");

        // 3. Fill form
        cy.get('[data-testid="input-name"]').type("Cypress Product");
        cy.get('[data-testid="input-image"]').type("https://via.placeholder.com/150");
        cy.get('[data-testid="input-price"]').type("199.99");
        cy.get('[data-testid="input-category"]').type("Cypress");

        // 4. Submit
        cy.contains("Add").click();

        // 5. Confirm product exists in list (can also check API or UI)
        cy.contains("Cypress Product").should("exist");
    });
});
