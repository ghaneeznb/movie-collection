export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Plot?: string;
    Ratings?: { Source: string; Value: string }[];
    Type?: string;
  }