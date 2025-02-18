import { createAction, props } from '@ngrx/store';
import { Movie } from '../../core/models/movie.model';

export const addMovie = createAction(
  '[Watchlist] Add Movie',
  props<{ movie: Movie }>()
);

export const removeMovie = createAction(
  '[Watchlist] Remove Movie',
  props<{ imdbID: string }>()
);

export const rateMovie = createAction(
  '[Watchlist] Rate Movie',
  props<{ imdbID: string, rating: number }>()
);