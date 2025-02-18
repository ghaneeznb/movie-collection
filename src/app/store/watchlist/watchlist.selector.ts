import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WatchlistState } from './watchlist.reducer';

export const selectWatchlistState = createFeatureSelector<WatchlistState>('watchlist');

export const selectWatchlistMovies = createSelector(
  selectWatchlistState,
  (state: WatchlistState) => state.movies
);