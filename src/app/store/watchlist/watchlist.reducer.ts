import { createReducer, on, Action } from '@ngrx/store';
import { Movie } from '../../core/models/movie.model';
import { addMovie, rateMovie, removeMovie } from './watchlist.acrion';

export interface WatchlistState {
  movies: Movie[];
}

export const initialState: WatchlistState = {
  movies: []
};

const _watchlistReducer = createReducer(
  initialState,
  on(addMovie, (state, { movie }) => {
    if (state.movies.find(m => m.imdbID === movie.imdbID)) {
      return state;
    }
    return { ...state, movies: [...state.movies, movie] };
  }),
  on(removeMovie, (state, { imdbID }) => ({
    ...state,
    movies: state.movies.filter(movie => movie.imdbID !== imdbID)
  }))
);

export function watchlistReducer(state: WatchlistState | undefined, action: Action) {
  return _watchlistReducer(state, action);
}