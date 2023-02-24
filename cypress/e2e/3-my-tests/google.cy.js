describe('Google Test', () => {

    beforeEach(() => {
        cy.log('I run before every test in every spec file!!!!!!')
        cy.visit('https://google.com');
    })

    it('should be titled "Google"', () => {
        cy.title().should('eq', 'Google');
    });

    it('should display google text on page', () => {
        cy.contains('Sign in');
    });
});

