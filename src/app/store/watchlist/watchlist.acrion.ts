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