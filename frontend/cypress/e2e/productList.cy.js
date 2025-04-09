describe("Login Redirect to ProductList", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it("should login and redirect to ProductList page", () => {
        cy.visit("/login");

        // Ensure the heading is present
        cy.contains("Login to Product Showcase").should("be.visible");

        // Use id-based selectors
        cy.get("#username").type("user");
        cy.get("#password").type("userTest123");

        // Click login button
        cy.get("button[type='submit']").click();

        // Should be redirected to the product list ("/")
        cy.url().should("eq", "http://localhost:3000/");

        // Validate that product list is shown
        cy.contains("Product Showcase").should("be.visible");
    });
});
