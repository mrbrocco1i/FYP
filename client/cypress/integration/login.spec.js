describe("Login Page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    })
    it("Shows a header", () => {
        cy.get('.MuiTypography-h5').should("contain", "Log in");
    });

    describe('Submit', () => {
        describe("With right username and password", () => {
            it('Allows username and  password to be submitted and shows homepage', () => {
                cy.get('#email').type('admin');
                cy.get('#password').type('admin');
                cy.get('.MuiButtonBase-root').click();
                cy.wait(3000);
                cy.get('.MuiTypography-root').should('contain','admin');
            })
        })
        describe('With wrong info', () => {
            it('return error', () => {
                cy.get('#email').type('admi');
                cy.get('#password').type('admin');
                cy.get('.MuiButtonBase-root').click();
                cy.get('#alert-dialog-description').should('contain','Invalid');
            })
        })

    })
})