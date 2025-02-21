describe('Movie App E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should search and select a movie, add it to the watchlist, and remove it', () => {
    cy.get('input[placeholder="Search movies"]').type('Iron Man');
    cy.get('button').contains('Search').click();

    cy.get('.movie-card').should('have.length.greaterThan', 0);
    cy.get('.movie-card').first().click(); 

    cy.url().should('include', '/movie/');
    cy.get('.movie-detail').should('be.visible');
    cy.get('.movie-detail h2').should('contain.text', 'Iron Man');

    cy.get('button').contains('Add to Watchlist').click();
    
    cy.get('a').contains('Watchlist').click();
    cy.url().should('include', '/watchlist');

    cy.get('.watchlist .movie-card').should('contain.text', 'Iron Man');

    cy.get('.watchlist .movie-card button').contains('Remove').click();

    cy.get('.watchlist .movie-card').should('not.exist');
  });
});
