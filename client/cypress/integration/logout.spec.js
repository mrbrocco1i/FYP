describe("customer", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get('#email').type('admin');
        cy.get('#password').type('admin');
        cy.get('.MuiButtonBase-root').click();
        cy.wait(3000);


    })


    describe('success', () => {
        describe("success", () => {
            it('success', () => {
                cy.get('.right_nav > .dropdown > .dropdown-toggle').click();
                cy.get('.right_nav > .dropdown > .dropdown-menu > :nth-child(5)').click();
                cy.get('.right_nav > :nth-child(1) > .nav-link').should('contain','Log in');
            })
        })


    })
})