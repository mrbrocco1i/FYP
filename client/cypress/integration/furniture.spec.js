describe("furniture", () => {
    beforeEach(() => {
        cy.visit("/furniture");
    })
    it("Shows a header", () => {
        cy.get('.MuiTypography-h2').should("contain", "Furniture");
    });


})