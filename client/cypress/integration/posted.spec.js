describe("post", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get('#email').type('admin');
        cy.get('#password').type('admin');
        cy.get('.MuiButtonBase-root').click();
        cy.wait(3000);
        cy.get('.right_nav > .dropdown > .dropdown-toggle').click();
        cy.get('.right_nav > .dropdown > .dropdown-menu > :nth-child(2) > .nav-link').click();
    })


    describe('success', () => {
        describe("success", () => {
            it('success', () => {
                cy.wait(500);
                cy.get(':nth-child(1) > .MuiGrid-container > .MuiGrid-grid-xs-true > :nth-child(1)').should("contain",'T-shirt')
            })
        })


    })
})