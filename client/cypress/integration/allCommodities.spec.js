describe("all", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/items");
    })
    it("Shows a header", () => {
        cy.get('.MuiTypography-h2').should("contain", "All Commodities");
    });


})