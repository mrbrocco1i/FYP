describe("clothing", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/clothing");
    })
    it("Shows a header", () => {
        cy.get('.MuiTypography-h2').should("contain", "Clothing");
    });


})