describe('Watchlist Flow', () => {
    it('adds and removes a movie from the watchlist', () => {
      cy.visit('/movies');
      cy.get('app-movie-card').first().click();
      cy.url().should('include', '/movies/');
      cy.get('button').contains('Add to Watchlist').click();
      cy.visit('/watchlist');
      cy.contains('Test Movie');
      cy.get('button').contains('Remove').click();
      cy.contains('No movies added yet!');
    });
  });