import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  { path: 'movies', loadChildren: () => import('./features/movies/movie.routes').then(m => m.MOVIE_ROUTES) },
  { path: 'watchlist', loadChildren: () => import('./features/watchlist/watchlist.routes').then(m => m.WATCHLIST_ROUTES) },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];