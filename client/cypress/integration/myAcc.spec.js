describe("post", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get('#email').type('admin');
        cy.get('#password').type('admin');
        cy.get('.MuiButtonBase-root').click();
        cy.wait(3000);
        cy.get('.right_nav > .dropdown > .dropdown-toggle').click();
        cy.get('.right_nav > .dropdown > .dropdown-menu > :nth-child(1) > .nav-link').click();
    })


    describe('check', () => {
        describe("With right info", () => {
            it('success', () => {
                cy.wait(500);
                cy.get('#panel1bh-header > .MuiExpansionPanelSummary-content > .makeStyles-heading-17').should("contain",'Username')
            })
        })


    })
})