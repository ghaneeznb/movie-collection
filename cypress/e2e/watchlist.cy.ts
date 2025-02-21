describe('Watchlist E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a movie to the watchlist and remove it', () => {
    cy.visit('/watchlist');
    cy.get('.watchlist .movie-card').should('not.exist'); 

    cy.visit('/');
    cy.get('input[placeholder="Search movies"]').type('Spider-Man');
    cy.get('button').contains('Search').click();

    cy.get('.movie-card').should('have.length.greaterThan', 0);
    cy.get('.movie-card').first().click();

    cy.get('button').contains('Add to Watchlist').click();

    cy.visit('/watchlist');
    cy.get('.watchlist .movie-card').should('contain.text', 'Spider-Man');

    cy.get('.watchlist .movie-card button').contains('Remove').click();
    cy.get('.watchlist .movie-card').should('not.exist');
  });
});
