describe("customer", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get('#email').type('admin');
        cy.get('#password').type('admin');
        cy.get('.MuiButtonBase-root').click();
        cy.wait(3000);
        cy.get('.right_nav > .dropdown > .dropdown-toggle').click();
        cy.get('.right_nav > .dropdown > .dropdown-menu > :nth-child(3) > .nav-link').click();
    })


    describe('success', () => {
        describe("success", () => {
            it('success', () => {
                cy.get('.MuiTypography-h2').should("contain",'Contact');
                cy.get('#msg').type('cypress');
                cy.get('.MuiButtonBase-root').click();
                cy.wait(3000);
                cy.get('.MuiTypography-h2').should("contain",'Contact');
            })
        })


    })
})