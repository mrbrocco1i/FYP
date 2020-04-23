describe("post", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get('#email').type('admin');
        cy.get('#password').type('admin');
        cy.get('.MuiButtonBase-root').click();
        cy.wait(3000);
        cy.get('.btn').click();
    })
    it("Shows a header", () => {
        cy.get('.MuiTypography-h4').should("contain", "Posting");
    });

    describe('Submit', () => {
        describe("With right info", () => {
            it('success', () => {
                cy.get('#name').type('cypress');
                cy.get('.MuiButtonBase-root').click();
                cy.get('#type').type('cypress');
                cy.get('#description').type('cypress');
                cy.get('#material').type('cypress');
                cy.get('#manufacturer').type('cypress');
                cy.get('#price').type('10');
                cy.get('.MuiButton-contained').click();
                cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-349').check();
                cy.get('.MuiButton-contained').click();
                cy.get('.MuiTypography-h5').should("contain", "Thank");
            })
        })


    })
})