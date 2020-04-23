describe("Signup Page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/signup");
    })
    it("Shows a header", () => {
        cy.get('.MuiTypography-h5').should("contain", "Sign up");
    });

    describe('Submit', () => {
        describe('email being registered already', () => {
            it('return error', () => {
                cy.get('#username').type('admin');
                cy.get('#email').type('admin');
                cy.get('#password').type('admin');
                cy.get('.MuiButton-root').click();
                cy.wait(500);
                cy.get('#alert-dialog-description').should('contain','Error: Account already exist.. Please sign up again.');
            })
        })

    })
})