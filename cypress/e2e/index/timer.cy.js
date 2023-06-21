describe('pomodoro timer application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should show the timer component', () => {
    cy.clock();                                // take control of timers
    cy.get('#timer-btn').click();
    cy.tick(30000);                            // move time frame +30 seconds
    cy.get('.btn').should('be.enabled')        // button still available
  })

})
