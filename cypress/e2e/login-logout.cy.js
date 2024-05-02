describe('Login and Logout Test', () => {
  it('Logs in, checks logged user, and logs out, checks if name not visible to SWAPI GAME website', () => {
    //Visit the login page
    cy.visit('/login')

    //Enter creds
    cy.get('[data-cy="login-email"]').type('test987@gmail.com')
    cy.get('[data-cy="login-password"]').type('test987')

    //Submit user
    cy.get('[data-cy="login-submit"]').click()

    // Verify that the user is logged in
    cy.url().should('include', '/game')
    cy.contains('Logged in: test987@gmail.com').should('be.visible')

    // Verify that the user is logged out
    cy.get('[data-cy="signout"]').click()
    cy.url().should('include', 'login')
    cy.get('[data-cy="signed-in-user-email"]').should('not.exist')
  })
})
