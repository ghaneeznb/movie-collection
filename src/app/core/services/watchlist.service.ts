import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  addMovie(mockMovie: Movie) {
    throw new Error('Method not implemented.');
  }
  watchlist$: any;
  removeMovie(imdbID: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
