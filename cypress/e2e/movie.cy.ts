describe('Movie App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display a list of movies', () => {
    cy.get('app-movie-card').should('have.length.at.least', 1);
  });

  it('should search for a movie', () => {
    cy.get('input[placeholder="Search movies"]').clear().type('Batman');
    cy.get('button').contains('Search').click();
    cy.get('app-movie-card').should('contain', 'Batman');
  });

  it('should navigate to movie details', () => {
    cy.get('app-movie-card').first().click();
    cy.url().should('include', '/movie-detail/');
    cy.get('h1').should('exist');
  });

  it('should add a movie to the watchlist', () => {
    cy.get('app-movie-card').first().click();
    cy.get('button').contains('Add to Watchlist').click();
    cy.get('app-movie-card').should('have.length.at.least', 1);
  });
});
