export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Genre: string;
    Poster: string;
    Plot?: string;
    Director?: string;
    Actors?: string;
    Runtime?: string;
    Rated?: string;
    Released?: string;
    Language?: string;
    Country?: string;
    Ratings?: { Source: string; Value: string }[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    Type?: string;
  }